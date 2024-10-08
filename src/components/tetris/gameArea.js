import { settings, nrOfBlocks } from "./settings";
import { drawSquare } from "./blocks";

export function createEmptyMatrix() {
  const gameMatrix = [];
  for (let row = 0; row < nrOfBlocks.y; row++) {
    gameMatrix.push([]);
    for (let col = 0; col < nrOfBlocks.x; col++) {
      gameMatrix[row].push(null);
    }
  }
  return gameMatrix;
}

export function drawPlacedBlocks(ctx, placedBlocks) {
  // console.log(placedBlocks);
  placedBlocks.forEach((row, rId) => {
    row.forEach((col, cId) => {
      if (col !== null) {
        drawSquare(ctx, cId * settings.squareSize, rId * settings.squareSize);
      }
    });
  });
}
