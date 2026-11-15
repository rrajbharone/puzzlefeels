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
  const r = await fetchUrl('https://api.github.com/repos/SmilingWayne/puzzlekit-dataset/contents/ingest');
  if (r.status === 200) {
    const list = JSON.parse(r.data);
    console.log('ingest contents:', list.map(i => i.name));
  }
}

run().catch(console.error);
