import 'dotenv/config';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function run() {
  const res = await db.execute("SELECT * FROM post_translations WHERE post_id = 'cze37f92'");
  console.log(res.rows);
}
run();
