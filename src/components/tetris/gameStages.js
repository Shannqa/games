import { createEmptyMatrix } from "./gameArea.js";
import { getStartCoords } from "./blocks.js";

export function gameLoaded(
  setCurrentBlockType,
  setNextBlock,
  setPlacedBlocks,
  blocks,
  setGameState,
  getRandomBlock
) {
  // first load of the game
  const currentType = getRandomBlock(blocks);
  const mat = createEmptyMatrix();
  console.log(mat);
  setPlacedBlocks(createEmptyMatrix());

  setCurrentBlockType(currentType);
  setNextBlock(getRandomBlock(blocks));
  getStartCoords(currentType);
  setGameState("playing");
}

export function newBlock(
  setCurrentBlockType,
  nextBlock,
  setNextBlock,
  blocks,
  setGameState,
  getRandomBlock
) {
  setCurrentBlockType(nextBlock);
  getStartCoords(nextBlock);
  setNextBlock(getRandomBlock(blocks));
  setGameState("playing");
}

export function clearedRow() {}
