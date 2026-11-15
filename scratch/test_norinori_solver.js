// Scratch script to test Norinori solver logic
class NorinoriSolver {
  constructor(width, height, regions) {
    this.width = width;
    this.height = height;
    this.N = width * height;
    this.regions = regions; // array of cell indices (0 .. N-1) for each region
    
    // Map cell index to region index
    this.cellRegion = new Int32Array(this.N);
    for (let r = 0; r < regions.length; r++) {
      for (const idx of regions[r]) {
        this.cellRegion[idx] = r;
      }
    }
    
    // Precompute orthogonal neighbors for each cell
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

  // Solves and returns { count, solution }
  solve(maxSolutions = 2) {
    const grid = new Int8Array(this.N);
    grid.fill(-1); // -1 = unassigned, 0 = empty, 1 = shaded

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

        // 1. Check regions
        for (let r = 0; r < this.regions.length; r++) {
          const shaded = regionShadedCount[r];
          const rem = regionRemainingCount[r];
          if (shaded > 2) return false;
          if (shaded + rem < 2) return false;

          // If region already has 2 shaded cells, all remaining must be 0
          if (shaded === 2 && rem > 0) {
            for (const idx of this.regions[r]) {
              if (grid[idx] === -1) {
                grid[idx] = 0;
                regionRemainingCount[r]--;
                changed = true;
              }
            }
          }
          // If shaded + rem === 2, all remaining must be 1
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

        // 2. Check shaded cell domino constraints
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

            // If already has 1 shaded neighbor, all other neighbors must be 0
            if (shadedNeighbors === 1 && unassignedNeighbors.length > 0) {
              for (const nb of unassignedNeighbors) {
                grid[nb] = 0;
                const reg = this.cellRegion[nb];
                regionRemainingCount[reg]--;
                changed = true;
              }
            }

            // If has 0 shaded neighbors and exactly 1 unassigned neighbor, that neighbor MUST be 1
            if (shadedNeighbors === 0 && unassignedNeighbors.length === 1) {
              const nb = unassignedNeighbors[0];
              grid[nb] = 1;
              const reg = this.cellRegion[nb];
              regionShadedCount[reg]++;
              regionRemainingCount[reg]--;
              changed = true;
            }
          } else if (grid[idx] === -1) {
            // If cell is unassigned, but has 2 or more shaded neighbors, it CANNOT be shaded (must be 0)
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

      // Find an unassigned cell
      // Heuristic: pick unassigned cell in a region closest to completion or with fewest cells
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
        // All cells assigned! Check validity
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

      // Try setting bestIdx = 1, then bestIdx = 0
      const reg = this.cellRegion[bestIdx];

      // Branch 1: Try shaded = 1 (if region allows it)
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

      // Branch 2: Try empty = 0 (if region remaining allows it)
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

// Quick test: 4x4 with 4 regions of size 4
// Let's create 4 2x2 blocks:
// R0: (0,0), (0,1), (1,0), (1,1)
// R1: (0,2), (0,3), (1,2), (1,3)
// R2: (2,0), (2,1), (3,0), (3,1)
// R3: (2,2), (2,3), (3,2), (3,3)
const test4x4 = new NorinoriSolver(4, 4, [
  [0, 1, 4, 5],
  [2, 3, 6, 7],
  [8, 9, 12, 13],
  [10, 11, 14, 15]
]);
const res4x4 = test4x4.solve(5);
console.log('4x4 solutions count:', res4x4.count);
