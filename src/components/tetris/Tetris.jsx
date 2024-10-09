import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import { settings } from "./settings.js";
import {
  blocks,
  drawCurrentBlock,
  moveBlockDown,
  checkIfRowComplete,
} from "./blocks.js";
import { drawMenu } from "./menu.js";
import styles from "../../styles/tetris.module.css";
import { gameLoaded, newBlock } from "./gameStages.js";
import { drawPlacedBlocks } from "./gameArea.js";
import { keyDown, keyUp } from "./keyboard.js";

function Tetris() {
  const [nextBlock, setNextBlock] = useState(null);
  const [gameState, setGameState] = useState("loaded");
  const [modal, setModal] = useState(false);
  const [placedBlocks, setPlacedBlocks] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => keyDown(e, placedBlocks);
    const handleKeyUp = (e) => keyUp(e);
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState === "loaded") {
      gameLoaded(setNextBlock, setPlacedBlocks, blocks, setGameState);
    } else if (gameState === "newBlock") {
      newBlock(nextBlock, setNextBlock, blocks, setGameState);
    }
  }, [gameState]);

  function draw(ctx, frameCount) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMenu(ctx, nextBlock);
    drawPlacedBlocks(ctx, placedBlocks);
    drawCurrentBlock(ctx);

    if (frameCount % settings.speed === 0) {
      // tick of the game
      moveBlockDown(placedBlocks, setPlacedBlocks, setGameState);
      // stopBlock(placedBlocks, setPlacedBlock, setGameState);
      // currentBlock.y += settings.squareSize;
    }
    // checkIfRowComplete(placedBlocks, setPlacedBlocks);
    // detectCollision(ctx);
  }

  return (
    <div className={styles.gameWindow}>
      <Canvas draw={draw} width={settings.canvasW} height={settings.canvasH} />
    </div>
  );
}

export default Tetris;
