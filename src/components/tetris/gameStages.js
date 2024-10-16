import { createEmptyMatrix } from "./gameArea.js";
import { getStartCoords, getRandomBlock } from "./blocks.js";

export function gameLoaded(
  setNextBlock,
  setPlacedBlocks,
  blocks,
  setGameState
) {
  // first load of the game
  const currentType = getRandomBlock(blocks);
  const mat = createEmptyMatrix();
  console.log(mat);
  setPlacedBlocks(createEmptyMatrix());
  setNextBlock(getRandomBlock(blocks));
  getStartCoords(currentType);
  setGameState("playing");
}

export function newBlock(
  nextBlock,
  setNextBlock,
  blocks,
  setGameState
) {
  getStartCoords(nextBlock);
  setNextBlock(getRandomBlock(blocks));
  setGameState("playing");
}

export function lineClear() {}

export function gameLoss() {
  
}