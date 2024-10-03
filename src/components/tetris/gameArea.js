import { settings } from "./settings";

export function createEmptyMatrix() {
  const gameMatrix = [];
  for (let row = 0; row < nrOfBlocks.x; row++) {
    gameMatrix.push([]);
    for (let col = 0; col < nrOfBlocks.y; col++) {
      gameMatrix[row].push(null);
    }
  }
  return gameMatrix;
}

export function drawPlacedBlocks(ctx, placedBlocks) {
  placedBlocks.forEach((row, rId) => {
    row.forEach((col, cId) => {
      if (true) {
        drawSquare(ctx, col, cId * square.width, rId * square.height);
      }
    });
  });
}
