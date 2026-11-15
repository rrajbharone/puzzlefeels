import fs from 'fs';
import https from 'https';

class NorinoriSolver {
  constructor(width, height, regions) {
    this.width = width;
    this.height = height;
    this.N = width * height;
    this.regions = regions;
    
    this.cellRegion = new Int32Array(this.N);
    for (let r = 0; r < regions.length; r++) {
      for (const idx of regions[r]) {
        this.cellRegion[idx] = r;
      }
    }
    
    this.neighbors = [];
    for (let idx = 0; idx < this.N; idx++) {
      const x = idx % width;
      const y = Math.floor(idx / width);
      const nbs = [];
      if (x > 0) nbs.push(idx - 1);
      if (x < width - 1) nbs.push(idx + 1);
      if (y > 0) nbs.push(idx - width);
      if (y < height - 1) nbs.push(idx + width);
      this.neighbors.push(nbs);
    }
  }

  solve(maxSolutions = 2) {
    const grid = new Int8Array(this.N);
    grid.fill(-1);

    const regionShadedCount = new Int8Array(this.regions.length);
    const regionRemainingCount = new Int8Array(this.regions.length);
    for (let r = 0; r < this.regions.length; r++) {
      regionRemainingCount[r] = this.regions[r].length;
    }

    const solutions = [];

    const propagate = () => {
      let changed = true;
      while (changed) {
        changed = false;

        for (let r = 0; r < this.regions.length; r++) {
          const s = regionShadedCount[r];
          const rem = regionRemainingCount[r];
          if (s > 2) return false;
          if (s + rem < 2) return false;

          if (s === 2 && rem > 0) {
            for (const idx of this.regions[r]) {
              if (grid[idx] === -1) {
                grid[idx] = 0;
                regionRemainingCount[r]--;
                changed = true;
              }
            }
          }
          if (s + rem === 2 && rem > 0) {
            for (const idx of this.regions[r]) {
              if (grid[idx] === -1) {
                grid[idx] = 1;
                regionShadedCount[r]++;
                regionRemainingCount[r]--;
                changed = true;
              }
            }
          }
        }

        for (let idx = 0; idx < this.N; idx++) {
          if (grid[idx] === 1) {
            let shadedCount = 0;
            let unassignedList = [];
            for (const nb of this.neighbors[idx]) {
              if (grid[nb] === 1) shadedCount++;
              else if (grid[nb] === -1) unassignedList.push(nb);
            }

            if (shadedCount > 1) return false;
            if (shadedCount === 0 && unassignedList.length === 0) return false;

            if (shadedCount === 1 && unassignedList.length > 0) {
              for (const nb of unassignedList) {
                grid[nb] = 0;
                const reg = this.cellRegion[nb];
                regionRemainingCount[reg]--;
                changed = true;
              }
            }

            if (shadedCount === 0 && unassignedList.length === 1) {
              const nb = unassignedList[0];
              grid[nb] = 1;
              const reg = this.cellRegion[nb];
              regionShadedCount[reg]++;
              regionRemainingCount[reg]--;
              changed = true;
            }
          } else if (grid[idx] === -1) {
            let shadedCount = 0;
            for (const nb of this.neighbors[idx]) {
              if (grid[nb] === 1) shadedCount++;
            }
            if (shadedCount >= 2) {
              grid[idx] = 0;
              const reg = this.cellRegion[idx];
              regionRemainingCount[reg]--;
              changed = true;
            }
          }
        }
      }
      return true;
    };

    const search = () => {
      if (solutions.length >= maxSolutions) return;

      let bestIdx = -1;
      let minRem = 9999;
      for (let r = 0; r < this.regions.length; r++) {
        const rem = regionRemainingCount[r];
        if (rem > 0 && rem < minRem) {
          for (const idx of this.regions[r]) {
            if (grid[idx] === -1) {
              bestIdx = idx;
              minRem = rem;
              break;
            }
          }
        }
      }

      if (bestIdx === -1) {
        for (let r = 0; r < this.regions.length; r++) {
          if (regionShadedCount[r] !== 2) return;
        }
        for (let idx = 0; idx < this.N; idx++) {
          if (grid[idx] === 1) {
            let sn = 0;
            for (const nb of this.neighbors[idx]) {
              if (grid[nb] === 1) sn++;
            }
            if (sn !== 1) return;
          }
        }
        solutions.push(Array.from(grid));
        return;
      }

      const reg = this.cellRegion[bestIdx];

      if (regionShadedCount[reg] < 2) {
        const snapGrid = new Int8Array(grid);
        const snapS = new Int8Array(regionShadedCount);
        const snapR = new Int8Array(regionRemainingCount);

        grid[bestIdx] = 1;
        regionShadedCount[reg]++;
        regionRemainingCount[reg]--;

        if (propagate()) {
          search();
        }

        grid.set(snapGrid);
        regionShadedCount.set(snapS);
        regionRemainingCount.set(snapR);
      }

      if (regionShadedCount[reg] + regionRemainingCount[reg] - 1 >= 2) {
        const snapGrid = new Int8Array(grid);
        const snapS = new Int8Array(regionShadedCount);
        const snapR = new Int8Array(regionRemainingCount);

        grid[bestIdx] = 0;
        regionRemainingCount[reg]--;

        if (propagate()) {
          search();
        }

        grid.set(snapGrid);
        regionShadedCount.set(snapS);
        regionRemainingCount.set(snapR);
      }
    };

    if (propagate()) {
      search();
    }

    return {
      count: solutions.length,
      solutions
    };
  }
}

function parseRegions(size, hBorders, vBorders) {
  const parent = Array.from({length: size * size}, (_, i) => i);
  function find(i) {
    if (parent[i] === i) return i;
    return parent[i] = find(parent[i]);
  }
  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) parent[rootI] = rootJ;
  }

  let hIdx = 0;
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size; c++) {
      if (hBorders[hIdx++] !== '1') union(r * size + c, (r + 1) * size + c);
    }
  }

  let vIdx = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size - 1; c++) {
      if (vBorders[vIdx++] !== '1') union(r * size + c, r * size + c + 1);
    }
  }

  const regionMap = new Map();
  for (let i = 0; i < size * size; i++) {
    const root = find(i);
    if (!regionMap.has(root)) regionMap.set(root, []);
    regionMap.get(root).push(i);
  }

  return Array.from(regionMap.values());
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node' } }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

async function main() {
  const categories = [
    { dir: '6normal', size: 6, difficulty: 'normal' },
    { dir: '6hard', size: 6, difficulty: 'hard' },
    { dir: '8normal', size: 8, difficulty: 'normal' },
    { dir: '8hard', size: 8, difficulty: 'hard' },
    { dir: '10normal', size: 10, difficulty: 'normal' },
    { dir: '10hard', size: 10, difficulty: 'hard' },
    { dir: '15normal', size: 15, difficulty: 'normal' },
    { dir: '15hard', size: 15, difficulty: 'hard' },
    { dir: '20normal', size: 20, difficulty: 'normal' },
    { dir: '20hard', size: 20, difficulty: 'hard' },
  ];

  const allPuzzles = [];

  for (const cat of categories) {
    console.log(`Processing ${cat.dir}...`);
    const files = await fetchJson(`https://api.github.com/repos/edofarrell/norinori-honey-badger-algorithm/contents/Data/${cat.dir}`);
    // Pick 3 puzzles per category
    const selectedFiles = files.slice(0, 3);
    for (const f of selectedFiles) {
      const rawText = await fetchText(`https://raw.githubusercontent.com/edofarrell/norinori-honey-badger-algorithm/master/Data/${cat.dir}/${encodeURIComponent(f.name)}`);
      const lines = rawText.trim().split('\n').map(l => l.trim());
      const puzzleId = lines[0];
      const hB = lines[2];
      const vB = lines[3];
      const regions = parseRegions(cat.size, hB, vB);
      
      const solver = new NorinoriSolver(cat.size, cat.size, regions);
      const t0 = Date.now();
      const res = solver.solve();
      if (res.count === 1) {
        console.log(`  [OK] ${cat.dir} ${f.name} solved in ${Date.now() - t0}ms`);
        allPuzzles.push({
          id: `${cat.size}x${cat.size}-${cat.difficulty}-${puzzleId.replace(/,/g, '')}`,
          originalId: puzzleId,
          size: cat.size,
          difficulty: cat.difficulty,
          hBorders: hB,
          vBorders: vB,
          regions,
          solution: res.solutions[0]
        });
      } else {
        console.error(`  [FAIL] ${cat.dir} ${f.name} count = ${res.count}`);
      }
    }
  }

  console.log(`Total verified puzzles collected: ${allPuzzles.length}`);
  fs.writeFileSync('scratch/norinori_verified_dataset.json', JSON.stringify(allPuzzles, null, 2));
}

main().catch(console.error);
