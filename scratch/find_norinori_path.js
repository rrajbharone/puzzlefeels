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
  const r = await fetchUrl('https://api.github.com/repos/SmilingWayne/puzzlekit-dataset/contents/data');
  if (r.status === 200) {
    const list = JSON.parse(r.data);
    const nori = list.filter(item => item.name.toLowerCase().includes('norinori'));
    console.log('Found in /data:', nori);
  } else {
    console.log('Status /data:', r.status);
    const r2 = await fetchUrl('https://api.github.com/repos/SmilingWayne/puzzlekit-dataset/contents');
    const root = JSON.parse(r2.data);
    console.log('Root dirs:', root.map(i => i.name));
  }
}

run().catch(console.error);
