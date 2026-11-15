// Fetch README of puzzlekit-dataset to find file paths
import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  const r = await fetchUrl('https://raw.githubusercontent.com/SmilingWayne/puzzlekit-dataset/main/README.md');
  console.log('Status:', r.status);
  console.log(r.data.slice(0, 1000));
}

run().catch(console.error);
