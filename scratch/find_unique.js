// Norinori Generator with automated region refinement for uniqueness
import fs from 'fs';

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

function findUniquePuzzle(width, height) {
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

  for (let trial = 0; trial < 1000; trial++) {
    // 1. Place dominoes
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

    // Target domino count: roughly N / 4.5 to N / 6
    if (dominoes.length < Math.floor(N / 6)) continue;

    const numDominoes = dominoes.length;
    // Let's create regions!
    // At least 40%-60% of dominoes get their own private region (size 2 or 3)
    const regions = [];
    const usedShaded = new Set();
    const cellRegion = new Int32Array(N);
    cellRegion.fill(-1);

    // Pick 50% of dominoes to be their own region
    for (const d of dominoes) {
      if (Math.random() < 0.5) {
        const regId = regions.length;
        cellRegion[d[0]] = regId;
        cellRegion[d[1]] = regId;
        regions.push([d[0], d[1]]);
        usedShaded.add(d[0]);
        usedShaded.add(d[1]);
      }
    }

    // Pair up remaining shaded cells
    const remainingShaded = [];
    for (const d of dominoes) {
      if (!usedShaded.has(d[0])) remainingShaded.push(d[0]);
      if (!usedShaded.has(d[1])) remainingShaded.push(d[1]);
    }

    // Pair up remainingShaded
    let ok = true;
    while (remainingShaded.length >= 2) {
      const c1 = remainingShaded.pop();
      let bestDist = 999;
      let bestIdx = -1;
      const x1 = c1 % width;
      const y1 = Math.floor(c1 / width);

      for (let i = 0; i < remainingShaded.length; i++) {
        const c2 = remainingShaded[i];
        const dist = Math.abs(x1 - (c2 % width)) + Math.abs(y1 - Math.floor(c2 / width));
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      if (bestIdx !== -1 && bestDist <= 4) {
        const c2 = remainingShaded.splice(bestIdx, 1)[0];
        const regId = regions.length;
        cellRegion[c1] = regId;
        cellRegion[c2] = regId;
        regions.push([c1, c2]);
      } else {
        ok = false;
        break;
      }
    }

    if (!ok || regions.length !== numDominoes) continue;

    // Grow regions to fill all empty cells
    const frontier = [];
    for (let r = 0; r < regions.length; r++) {
      for (const c of regions[r]) {
        frontier.push({ cell: c, region: r });
      }
    }

    while (frontier.length > 0) {
      const randIdx = Math.floor(Math.random() * frontier.length);
      const { cell, region } = frontier.splice(randIdx, 1)[0];

      for (const nb of neighbors(cell)) {
        if (cellRegion[nb] === -1) {
          cellRegion[nb] = region;
          regions[region].push(nb);
          frontier.push({ cell: nb, region });
        }
      }
    }

    // Check if grid completely covered
    if (regions.some(r => r.length < 2) || regions.reduce((sum, r) => sum + r.length, 0) !== N) {
      continue;
    }

    // Check with solver
    const solver = new NorinoriSolver(width, height, regions);
    const res = solver.solve(2);
    if (res.count === 1) {
      return {
        width,
        height,
        regions,
        solution: res.solutions[0],
        numDominoes
      };
    }
  }
  return null;
}

console.log('Testing 6x6 findUniquePuzzle...');
const p = findUniquePuzzle(6, 6);
if (p) {
  console.log('6x6 SUCCESS! Regions:', p.regions.length, 'dominoes:', p.numDominoes);
} else {
  console.log('6x6 FAILED');
}
