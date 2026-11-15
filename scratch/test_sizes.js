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

    let solutions = [];

    const propagate = () => {
      let changed = true;
      while (changed) {
        changed = false;

        for (let r = 0; r < this.regions.length; r++) {
          const shaded = regionShadedCount[r];
          const rem = regionRemainingCount[r];
          if (shaded > 2) return false;
          if (shaded + rem < 2) return false;

          if (shaded === 2 && rem > 0) {
            for (const idx of this.regions[r]) {
              if (grid[idx] === -1) {
                grid[idx] = 0;
                regionRemainingCount[r]--;
                changed = true;
              }
            }
          }
          if (shaded + rem === 2 && rem > 0) {
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
            let shadedNeighbors = 0;
            let unassignedNeighbors = [];
            for (const nb of this.neighbors[idx]) {
              if (grid[nb] === 1) shadedNeighbors++;
              else if (grid[nb] === -1) unassignedNeighbors.push(nb);
            }

            if (shadedNeighbors > 1) return false;
            if (shadedNeighbors === 0 && unassignedNeighbors.length === 0) return false;

            if (shadedNeighbors === 1 && unassignedNeighbors.length > 0) {
              for (const nb of unassignedNeighbors) {
                grid[nb] = 0;
                const reg = this.cellRegion[nb];
                regionRemainingCount[reg]--;
                changed = true;
              }
            }

            if (shadedNeighbors === 0 && unassignedNeighbors.length === 1) {
              const nb = unassignedNeighbors[0];
              grid[nb] = 1;
              const reg = this.cellRegion[nb];
              regionShadedCount[reg]++;
              regionRemainingCount[reg]--;
              changed = true;
            }
          } else if (grid[idx] === -1) {
            let shadedNeighbors = 0;
            for (const nb of this.neighbors[idx]) {
              if (grid[nb] === 1) shadedNeighbors++;
            }
            if (shadedNeighbors >= 2) {
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
      let minChoices = 9999;

      for (let r = 0; r < this.regions.length; r++) {
        const rem = regionRemainingCount[r];
        if (rem > 0 && rem < minChoices) {
          for (const idx of this.regions[r]) {
            if (grid[idx] === -1) {
              bestIdx = idx;
              minChoices = rem;
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
        const snapshotGrid = new Int8Array(grid);
        const snapshotShaded = new Int8Array(regionShadedCount);
        const snapshotRem = new Int8Array(regionRemainingCount);

        grid[bestIdx] = 1;
        regionShadedCount[reg]++;
        regionRemainingCount[reg]--;

        if (propagate()) {
          search();
        }

        grid.set(snapshotGrid);
        regionShadedCount.set(snapshotShaded);
        regionRemainingCount.set(snapshotRem);
      }

      if (regionShadedCount[reg] + regionRemainingCount[reg] - 1 >= 2) {
        const snapshotGrid = new Int8Array(grid);
        const snapshotShaded = new Int8Array(regionShadedCount);
        const snapshotRem = new Int8Array(regionRemainingCount);

        grid[bestIdx] = 0;
        regionRemainingCount[reg]--;

        if (propagate()) {
          search();
        }

        grid.set(snapshotGrid);
        regionShadedCount.set(snapshotShaded);
        regionRemainingCount.set(snapshotRem);
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

function generateOnePuzzle(width, height, maxAttempts = 1000) {
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

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const cellDomino = new Int32Array(N);
    cellDomino.fill(-1);
    const dominoes = [];

    const cellOrder = Array.from({ length: N }, (_, i) => i).sort(() => Math.random() - 0.5);

    for (const c1 of cellOrder) {
      if (cellDomino[c1] !== -1) continue;

      const nbs1 = neighbors(c1);
      const touchesExisting = nbs1.some(nb => cellDomino[nb] !== -1);
      if (touchesExisting) continue;

      const validC2 = nbs1.filter(c2 => {
        if (cellDomino[c2] !== -1) return false;
        const nbs2 = neighbors(c2);
        return !nbs2.some(nb => nb !== c1 && cellDomino[nb] !== -1);
      });

      if (validC2.length > 0) {
        const c2 = validC2[Math.floor(Math.random() * validC2.length)];
        const dominoId = dominoes.length;
        cellDomino[c1] = dominoId;
        cellDomino[c2] = dominoId;
        dominoes.push([c1, c2]);
      }
    }

    // Domino count target: around N / 4 to N / 6
    const minD = Math.max(3, Math.floor(N / 5.5));
    if (dominoes.length < minD) continue;

    const numDominoes = dominoes.length;
    const allShadedCells = [];
    for (const d of dominoes) {
      allShadedCells.push(d[0], d[1]);
    }

    const regionPairs = [];
    const usedShaded = new Set();

    // 50% intra-domino regions
    for (const d of dominoes) {
      if (Math.random() < 0.5 && !usedShaded.has(d[0]) && !usedShaded.has(d[1])) {
        regionPairs.push([d[0], d[1]]);
        usedShaded.add(d[0]);
        usedShaded.add(d[1]);
      }
    }

    const remainingShaded = allShadedCells.filter(c => !usedShaded.has(c));
    remainingShaded.sort(() => Math.random() - 0.5);

    let pairedOk = true;
    while (remainingShaded.length >= 2) {
      const c1 = remainingShaded.pop();
      let bestDist = 999;
      let bestIdx = -1;
      const x1 = c1 % width;
      const y1 = Math.floor(c1 / width);

      for (let i = 0; i < remainingShaded.length; i++) {
        const c2 = remainingShaded[i];
        const x2 = c2 % width;
        const y2 = Math.floor(c2 / width);
        const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      if (bestIdx !== -1 && bestDist <= (width <= 8 ? 4 : 7)) {
        const c2 = remainingShaded.splice(bestIdx, 1)[0];
        regionPairs.push([c1, c2]);
      } else {
        pairedOk = false;
        break;
      }
    }

    if (!pairedOk || regionPairs.length !== numDominoes) continue;

    const cellRegion = new Int32Array(N);
    cellRegion.fill(-1);

    const regions = Array.from({ length: numDominoes }, () => []);
    const frontier = [];

    for (let r = 0; r < numDominoes; r++) {
      const [c1, c2] = regionPairs[r];
      cellRegion[c1] = r;
      cellRegion[c2] = r;
      regions[r].push(c1, c2);
      frontier.push({ cell: c1, region: r });
      frontier.push({ cell: c2, region: r });
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

    if (regions.some(r => r.length < 2) || regions.reduce((sum, r) => sum + r.length, 0) !== N) {
      continue;
    }

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

console.log('Testing generateOnePuzzle for 6x6, 8x8...');
const t1 = Date.now();
const p6 = generateOnePuzzle(6, 6);
console.log('6x6 result:', p6 ? `regions: ${p6.regions.length}` : 'failed', `(${Date.now() - t1}ms)`);

const t2 = Date.now();
const p8 = generateOnePuzzle(8, 8);
console.log('8x8 result:', p8 ? `regions: ${p8.regions.length}` : 'failed', `(${Date.now() - t2}ms)`);
