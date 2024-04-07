function createGrid() {
  const gridSize = 10;
  let gridArray = [];
  for (let y = 0; y < gridSize; y++) {
    gridArray.push([]);
    for (let x = 0; x < gridSize; x++) {
      gridArray[y].push(null);
    }
  }
  return gridArray;
}

export default createGrid;
