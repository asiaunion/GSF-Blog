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

  // Get the most recent item
  const latestItem = feed.items[0];
  console.log(`Latest post: "${latestItem.title}"`);
  console.log(`Published on: ${latestItem.pubDate}`);

  // Check if it's within the last 7 days
  const pubDate = new Date(latestItem.pubDate);
  const now = new Date();
  const diffTime = Math.abs(now - pubDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  if (diffDays > 7) {
    console.log(`The latest post is ${diffDays} days old. It was published more than 7 days ago. Skipping draft creation.`);
    return;
  }

  console.log("The post is new (within the last 7 days). Creating Buttondown draft...");

  const title = latestItem.title;
  const description = latestItem.contentSnippet || latestItem.content || "";
  const url = latestItem.link;

  const htmlBody = `<p>Hi,</p>

<p>A new post is live on GSF Ark:</p>

<h2>${title}</h2>

<p>${description}</p>

<p><a href="${url}">Read on the blog &rarr;</a></p>

<p>&mdash; Joseph<br>GSF Ark &middot; Tokyo real estate &amp; J-REIT</p>`;

  const payload = {
    subject: `[Draft] ${title}`,
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
