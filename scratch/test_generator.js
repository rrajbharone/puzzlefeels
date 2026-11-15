import fs from 'fs';

class NorinoriSolver {
  constructor(width, height, regions) {
    this.width = width;
    this.height = height;
    this.N = width * height;
    this.regions = regions; // array of cell indices (0 .. N-1)
    
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
        regionRemainingCount[reg]++;
        regionRemainingCount[reg]--;

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

// Function to generate a random Norinori puzzle
function generatePuzzle(width, height, targetRegionsCount = null) {
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

  // Try up to 100 attempts
  for (let attempt = 0; attempt < 200; attempt++) {
    // 1. Place dominoes such that no two dominoes touch orthogonally
    // A domino is 2 adjacent cells
    const cellDomino = new Int32Array(N);
    cellDomino.fill(-1);
    const dominoes = [];

    // Shuffle cell order
    const cellOrder = Array.from({ length: N }, (_, i) => i).sort(() => Math.random() - 0.5);

    for (const c1 of cellOrder) {
      if (cellDomino[c1] !== -1) continue;

      // Check if c1 is adjacent to any existing domino
      const nbs1 = neighbors(c1);
      const touchesExisting = nbs1.some(nb => cellDomino[nb] !== -1);
      if (touchesExisting) continue;

      // Find an available neighbor c2 that also doesn't touch any existing domino
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

    if (dominoes.length < Math.floor((width * height) / 6)) continue;

    const numDominoes = dominoes.length;
    // We need exactly numDominoes regions!
    // Each region must have exactly 2 shaded cells (which means 2 cells with cellDomino !== -1).
    // Let's pair up the 2*numDominoes shaded cells into groups of 2.
    // Some regions can contain both cells of a single domino (intra-domino region).
    // Some regions can contain 1 cell from domino A and 1 cell from domino B (straddling region).
    // To make an interesting puzzle, let's create region seeds!
    
    // Each region will have 2 seeds (shaded cells)
    const allShadedCells = [];
    for (const d of dominoes) {
      allShadedCells.push(d[0], d[1]);
    }

    // Shuffle and pair shaded cells into regions
    // But wait! Shaded cells in the same region must be close enough that a connected region can enclose them!
    // Let's cluster them or pair them:
    const regionPairs = [];
    const usedShaded = new Set();

    // 50% of dominoes stay entirely inside their own region
    // 50% cross regions
    for (const d of dominoes) {
      if (Math.random() < 0.45 && !usedShaded.has(d[0]) && !usedShaded.has(d[1])) {
        regionPairs.push([d[0], d[1]]);
        usedShaded.add(d[0]);
        usedShaded.add(d[1]);
      }
    }

    // For the remaining shaded cells, pair them by proximity
    const remainingShaded = allShadedCells.filter(c => !usedShaded.has(c));
    remainingShaded.sort(() => Math.random() - 0.5);

    while (remainingShaded.length >= 2) {
      const c1 = remainingShaded.pop();
      // Find closest unassigned shaded cell
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

      if (bestIdx !== -1 && bestDist <= 4) {
        const c2 = remainingShaded.splice(bestIdx, 1)[0];
        regionPairs.push([c1, c2]);
      } else {
        // If too far, abandon this attempt
        break;
      }
    }

    if (regionPairs.length !== numDominoes) continue;

    // Now grow regions from regionPairs to cover all empty cells!
    // Each cell in grid belongs to region 0 .. numDominoes-1
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

    // Grow using BFS / randomized expansion
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

    // Check if all cells covered
    if (regions.some(r => r.length < 2) || regions.reduce((sum, r) => sum + r.length, 0) !== N) {
      continue;
    }

    // Test with solver!
    const solver = new NorinoriSolver(width, height, regions);
    const res = solver.solve(2);
    if (res.count === 1) {
      console.log(`Success on attempt ${attempt}! Found unique solution puzzle of size ${width}x${height} with ${regions.length} regions.`);
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

const p6x6 = generatePuzzle(6, 6);
if (p6x6) {
  console.log('6x6 puzzle generated successfully!');
} else {
  console.log('Failed 6x6 generation');
}
