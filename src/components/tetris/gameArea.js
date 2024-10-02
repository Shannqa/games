export function createEmptyMatrix() {
  const gameMatrix = [];
  for (let row = 0; r < settings.blocksX; row++) {
    gameMatrix.push([]);
    for (let col = 0; col < settings.blocksY; col++) {
      gameMatrix[row].push(null)
    }
  }
  return gameMatrix;
}

export function drawPlacedBlocks(gameMatrix) {
  gameMatrix.forEach((row, rId) => {
    row.forEach((col, cId) => {
      if (true) {
        drawSquare(ctx, col, cId * square.width, rId * square.height)
      }
    })
    
  });
}