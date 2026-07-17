#!/usr/bin/env python3
import json
import urllib.request
import xml.etree.ElementTree as ET
import re
from datetime import datetime, timezone, timedelta

LOG_FILE = 'naver-drafts/naver-log.json'
QUEUE_FILE = 'docs/gsc/naver_post_queue_2026-W29.md'
RSS_URL = 'https://rss.blog.naver.com/gsfark.xml'

def fetch_rss_items(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            xml_data = response.read()
        root = ET.fromstring(xml_data)
        items = []
        for item in root.findall('.//item'):
            title = item.find('title').text or ''
            link = item.find('link').text or ''
            clean_link = link.split('?')[0]
            post_id = clean_link.split('/')[-1]
            pub_date = item.find('pubDate').text or ''
            
            items.append({
                'title': title,
                'post_id': post_id,
                'pub_date': pub_date
            })
        return items
    except Exception as e:
        print(f"Error fetching RSS: {e}")
        return []

def get_slug_from_naver_post(post_id):
    url = f"https://blog.naver.com/PostView.naver?blogId=gsfark&logNo={post_id}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8', errors='ignore')
        # Find CTA link to gsfark
        match = re.search(r'https://gsfark\.com/ko/posts/([^/"\'\?&]+)', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"Error fetching post {post_id}: {e}")
    return None

def sync():
    # Load naver-log.json
    with open(LOG_FILE, 'r', encoding='utf-8') as f:
        log_data = json.load(f)
        
    local_drafts = {}
    for g in log_data['generated']:
        local_drafts[g['slug']] = g
        
    rss_items = fetch_rss_items(RSS_URL)
    if not rss_items:
        print("No RSS items fetched.")
        return
        
    published_slugs = {p['slug'] for p in log_data.get('published', [])}
    new_published = list(log_data.get('published', []))
    
    updated = False
    matched_slugs = {}
    
    for item in rss_items:
        post_id = item['post_id']
        slug = get_slug_from_naver_post(post_id)
        if slug:
            matched_slugs[slug] = item
            print(f"Deterministic Match: RSS '{item['title']}' -> Slug '{slug}' (Naver ID: {post_id})")
        else:
            print(f"Could not extract CTA slug for Naver ID: {post_id}")
            
    # Add new ones to published
    for slug, item in matched_slugs.items():
        if slug not in published_slugs:
            if slug in local_drafts:
                meta = local_drafts[slug]
                entry = {
                    'slug': slug,
                    'title': meta.get('title', ''),
                    'published_at': datetime.now(timezone(timedelta(hours=9))).isoformat(),
                    'html_file': meta.get('html_file', f'{slug}-naver.html'),
                    'canonical': meta.get('canonical', ''),
                    'naver_url': f"https://blog.naver.com/gsfark/{item['post_id']}"
                }
                new_published.append(entry)
                published_slugs.add(slug)
                print(f"Added new published entry: {slug} (Naver ID: {item['post_id']})")
                updated = True
            else:
                print(f"Warning: Slug '{slug}' found on Naver but not in local generated list.")
            
    if updated:
        log_data['published'] = new_published
        with open(LOG_FILE, 'w', encoding='utf-8') as f:
            json.dump(log_data, f, ensure_ascii=False, indent=2)
        print("Updated naver-log.json successfully.")
        
        # Update queue markdown file as well
        update_queue_file(matched_slugs)
    else:
        print("No new updates to apply.")

def update_queue_file(matched_slugs):
    try:
        with open(QUEUE_FILE, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        updated_lines = []
        in_table = False
        
        for line in lines:
            if line.startswith('|') and 'slug' in line:
                in_table = True
                updated_lines.append(line)
                continue
                
            if in_table and line.startswith('|'):
                parts = [p.strip() for p in line.split('|')]
                if len(parts) >= 7:
                    slug = parts[2]
                    if slug in matched_slugs:
                        item = matched_slugs[slug]
                        naver_url = f"https://blog.naver.com/gsfark/{item['post_id']}"
                        parts[6] = f"완료: {naver_url}"
                        line = " | ".join(parts).strip() + "\n"
                updated_lines.append(line)
            else:
                in_table = False
                updated_lines.append(line)
                
        with open(QUEUE_FILE, 'w', encoding='utf-8') as f:
            f.writelines(updated_lines)
            
        print("Updated docs/gsc/naver_post_queue_2026-W29.md successfully.")
    except Exception as e:
        print(f"Error updating queue file: {e}")

if __name__ == '__main__':
    sync()
