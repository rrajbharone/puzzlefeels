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
  const lines = r.data.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes('norinori')) {
      console.log('Norinori line:', line);
    }
  }
}

run().catch(console.error);
