// Test anchor region strategy for fast uniqueness across all sizes
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

function generatePuzzleWithAnchors(width, height, difficulty = 'normal', maxTrials = 2000) {
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

  // Anchor fraction:
  // Normal: 30%-45% of regions stay size 2 or 3
  // Hard: 15%-25% of regions stay size 2
  const anchorProb = difficulty === 'normal' ? 0.35 : 0.20;

  for (let trial = 0; trial < maxTrials; trial++) {
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

    if (dominoes.length < Math.floor(N / 5.8)) continue;

    const numDominoes = dominoes.length;
    const cellRegion = new Int32Array(N);
    cellRegion.fill(-1);
    const regions = Array.from({ length: numDominoes }, () => []);

    // Pick anchor dominoes that will NOT expand past size 2
    const isAnchor = new Uint8Array(numDominoes);
    for (let r = 0; r < numDominoes; r++) {
      const [c1, c2] = dominoes[r];
      cellRegion[c1] = r;
      cellRegion[c2] = r;
      regions[r].push(c1, c2);
      if (Math.random() < anchorProb) {
        isAnchor[r] = 1;
      }
    }

    // Now occasionally swap a cell between two adjacent dominoes (straddling dominoes)
    // only if neither is an anchor
    for (let r1 = 0; r1 < numDominoes; r1++) {
      if (!isAnchor[r1] && Math.random() < 0.25) {
        for (let r2 = r1 + 1; r2 < numDominoes; r2++) {
          if (isAnchor[r2]) continue;
          const d1 = dominoes[r1];
          const d2 = dominoes[r2];
          let swapped = false;
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
              const x1 = d1[i] % width, y1 = Math.floor(d1[i] / width);
              const x2 = d2[j] % width, y2 = Math.floor(d2[j] / width);
              if (Math.abs(x1 - x2) + Math.abs(y1 - y2) <= 2) {
                const oldR1 = cellRegion[d1[i]];
                const oldR2 = cellRegion[d2[j]];
                cellRegion[d1[i]] = oldR2;
                cellRegion[d2[j]] = oldR1;
                regions[oldR1] = regions[oldR1].filter(c => c !== d1[i]).concat([d2[j]]);
                regions[oldR2] = regions[oldR2].filter(c => c !== d2[j]).concat([d1[i]]);
                swapped = true;
                break;
              }
            }
            if (swapped) break;
          }
          if (swapped) break;
        }
      }
    }

    // Now expand NON-ANCHOR regions to fill all empty cells!
    // (If an empty cell has only anchors nearby, then allow anchor to take it)
    const frontier = [];
    for (let r = 0; r < numDominoes; r++) {
      if (!isAnchor[r]) {
        for (const c of regions[r]) {
          frontier.push({ cell: c, region: r });
        }
      }
    }

    while (frontier.length > 0) {
      const randIdx = Math.floor(Math.random() * frontier.length);
      const { cell, region } = frontier.splice(randIdx, 1)[0];

      // Limit max region size to 6 to prevent oversized ambiguous regions
      if (regions[region].length >= 6) continue;

      for (const nb of neighbors(cell)) {
        if (cellRegion[nb] === -1) {
          cellRegion[nb] = region;
          regions[region].push(nb);
          frontier.push({ cell: nb, region });
        }
      }
    }

    // If any unassigned cells remain, fill them with nearest region
    const unassigned = [];
    for (let idx = 0; idx < N; idx++) {
      if (cellRegion[idx] === -1) unassigned.push(idx);
    }

    if (unassigned.length > 0) {
      let unassignedFrontier = [...unassigned];
      while (unassignedFrontier.length > 0) {
        const u = unassignedFrontier.shift();
        const nbs = neighbors(u);
        const assignedNbs = nbs.filter(nb => cellRegion[nb] !== -1);
        if (assignedNbs.length > 0) {
          const chosenNb = assignedNbs[Math.floor(Math.random() * assignedNbs.length)];
          const chosenReg = cellRegion[chosenNb];
          cellRegion[u] = chosenReg;
          regions[chosenReg].push(u);
        } else {
          unassignedFrontier.push(u); // try again later
        }
      }
    }

    if (regions.some(r => r.length < 2) || regions.reduce((sum, r) => sum + r.length, 0) !== N) {
      continue;
    }

    const solver = new NorinoriSolver(width, height, regions);
    const res = solver.solve(2);
    if (res.count === 1) {
      console.log(`Success ${width}x${height} (${difficulty}) on trial ${trial}! Regions: ${regions.length}`);
      return {
        width,
        height,
        difficulty,
        regions,
        solution: res.solutions[0],
        numDominoes
      };
    }
  }
  console.log(`Failed ${width}x${height} (${difficulty}) after ${maxTrials} trials.`);
  return null;
}

const p6 = generatePuzzleWithAnchors(6, 6, 'normal');
const p8 = generatePuzzleWithAnchors(8, 8, 'normal');
const p10 = generatePuzzleWithAnchors(10, 10, 'normal');
