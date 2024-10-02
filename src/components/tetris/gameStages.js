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
  setGameState
) {
  setCurrentBlockType(nextBlock);
  // reset coords of the new current block
  setNextBlock(getRandomBlock(blocks));
  setGameState("playing");
}
