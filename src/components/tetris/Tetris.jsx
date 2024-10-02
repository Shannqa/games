import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import { settings } from "./settings.js";
import { blocks, drawCurrentBlock, moveBlock, stopBlock } from "./blocks.js";
import { drawMenu } from "./menu.js";
import styles from "../../styles/tetris.module.css";
import { gameLoaded } from "./gameStages.js";
import { drawPlacedBlocks } from "./gameArea.js";

function Tetris() {
  const [nextBlock, setNextBlock] = useState(null);
  const [currentBlockType, setCurrentBlockType] = useState(null);
  const [gameState, setGameState] = useState("loaded");
  const [modal, setModal] = useState(false);
  const [placedBlocks, setPlacedBlocks] = useState([]);

  useEffect(() => {
    if (gameState === "loaded") {
      gameLoaded(
        setCurrentBlockType,
        setNextBlock,
        setPlacedBlocks,
        blocks,
        setGameState,
        getRandomBlock
      );
    } else if (gameState === "newBlock") {
      newBlock(
        setCurrentBlockType,
        nextBlock,
        setNextBlock,
        blocks,
        setGameState
      );
    }
  }, [gameState]);

  function getRandomBlock(blocks) {
    const blocksArr = Object.keys(blocks);
    const randomNr = Math.floor(Math.random() * blocksArr.length);
    const randomBlock = blocksArr[randomNr];
    return randomBlock;
  }

  function draw(ctx, frameCount) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMenu(ctx, nextBlock);
    drawPlacedBlocks(ctx, placedBlocks);
    drawCurrentBlock(ctx, currentBlockType);

    if (frameCount % settings.speed === 0) {
      // tick of the game
      moveBlock();
      stopBlock(placedBlocks, setPlacedBlocks, currentBlockType, setGameState);
      // currentBlock.y += settings.squareSize;
    }

    // detectCollision(ctx);
  }

  return (
    <div className={styles.gameWindow}>
      <Canvas draw={draw} width={settings.canvasW} height={settings.canvasH} />
    </div>
  );
}

export default Tetris;
