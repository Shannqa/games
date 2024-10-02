import { createEmptyMatrix } from "./gameArea.js";


export function gameLoaded(setCurrentBlockType, setNextBlock, setPlacedBlocks, blocks, setGameState) {
  // first load of the game
  setPlacedBlocks(createEmptyMatrix())
  setCurrentBlockType(getRandomBlock(blocks));
  setNextBlock(getRandomBlock(blocks));
  setGameState("playing");
}

export function newBlock(setCurrentBlockType, nextBlock, setNextBlock, blocks, setGameState) {
  setCurrentBlockType(nextBlock);
  // reset coords of the new current block
  setNextBlock(getRandomBlock(blocks));
  setGameState("playing");
}