import Parser from 'rss-parser';

const parser = new Parser();
const API_KEY = process.env.BUTTONDOWN_API_KEY;
const RSS_URL = 'https://gsfark.com/rss.xml';

if (!API_KEY) {
  console.error("ERROR: BUTTONDOWN_API_KEY environment variable is not set.");
  process.exit(1);
}

async function main() {
  console.log(`Fetching RSS feed from ${RSS_URL}...`);
  const feed = await parser.parseURL(RSS_URL);
  
  if (!feed.items || feed.items.length === 0) {
    console.log("No items found in the RSS feed.");
    return;
  }

  // Get all items published within the last 7 days
  const now = new Date();
  const recentItems = feed.items.filter(item => {
    const pubDate = new Date(item.pubDate);
    if (isNaN(pubDate.getTime()) || pubDate > now) return false;
    const diffTime = Math.abs(now - pubDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  if (recentItems.length === 0) {
    console.log("No new posts found within the last 7 days. Skipping draft creation.");
    return;
  }

  console.log(`Found ${recentItems.length} new post(s) within the last 7 days. Creating Buttondown draft...`);

  // Build the email body
  const esc = (s) => s ? s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
  let postsHtml = '';
  for (const item of recentItems) {
    const title = item.title;
    const description = item.contentSnippet || item.content || "";
    const url = item.link;

    postsHtml += `<h2>${esc(title)}</h2>\n<p>${description}</p>\n<p><a href="${url}">Read on the blog &rarr;</a></p>\n<hr/>\n`;
  }

  const htmlBody = `<p>Hi,</p>

<p>Here are the latest updates from GSF Ark this week:</p>

${postsHtml}

<p>&mdash; Joseph<br>GSF Ark &middot; Tokyo real estate &amp; J-REIT</p>`;

  let draftSubject = `[Draft] ${recentItems[0].title}`;
  if (recentItems.length > 1) {
    draftSubject = `[Draft] ${recentItems[0].title} and ${recentItems.length - 1} more`;
  }

  const payload = {
    subject: draftSubject,
    body: htmlBody,
    status: "draft"
  };

  const response = await fetch('https://api.buttondown.com/v1/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Failed to create draft. Status: ${response.status} ${response.statusText}`);
    console.error(`Response: ${errText}`);
    process.exit(1);
  }

  const result = await response.json();
  console.log("Successfully created draft!");
  console.log(`Draft ID: ${result.id}`);
  console.log(`Subject: ${result.subject}`);
}

main().catch(err => {
  console.error("An error occurred:", err);
  process.exit(1);
});
