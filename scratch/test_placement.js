import fs from 'fs';

function testDominoPlacement(width, height) {
  const N = width * height;
  const neighbors = (idx) => {
    const x = idx % width;
    const y = Math.floor(idx / width);
    const nbs = [];
    if (x > 0) nbs.push(idx - 1);
    if (x < width - 1) nbs.push(idx + 1);
    if (y > 0) nbs.push(idx - width);
    if (y < height - 1) nbs.push(idx + width);
    return nbs;
  };

  const cellDomino = new Int32Array(N);
  cellDomino.fill(-1);
  const dominoes = [];

  const order = Array.from({ length: N }, (_, i) => i).sort(() => Math.random() - 0.5);
  for (const c1 of order) {
    if (cellDomino[c1] !== -1) continue;
    const nbs1 = neighbors(c1);
    if (nbs1.some(nb => cellDomino[nb] !== -1)) continue;

    const validC2 = nbs1.filter(c2 => {
      if (cellDomino[c2] !== -1) return false;
      return !neighbors(c2).some(nb => nb !== c1 && cellDomino[nb] !== -1);
    });

    if (validC2.length > 0) {
      const c2 = validC2[Math.floor(Math.random() * validC2.length)];
      const dId = dominoes.length;
      cellDomino[c1] = dId;
      cellDomino[c2] = dId;
      dominoes.push([c1, c2]);
    }
  }

  console.log(`Placed ${dominoes.length} dominoes on ${width}x${height} (${dominoes.length * 2} shaded cells)`);
}

testDominoPlacement(6, 6);
testDominoPlacement(8, 8);
testDominoPlacement(10, 10);
testDominoPlacement(15, 15);
testDominoPlacement(20, 20);
