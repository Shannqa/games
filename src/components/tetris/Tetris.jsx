import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import { settings } from "./settings.js";
import { blocks, drawCurrentBlock } from "./blocks.js";
import { drawMenu } from "./menu.js";
import styles from "../../styles/tetris.module.css";

function Tetris() {
  const [nextBlock, setNextBlock] = useState(null);
  const [currentBlockType, setCurrentBlockType] = useState(null);
  const [gameState, setGameState] = useState("loaded");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (gameState === "loaded") {
      setCurrentBlockType(getRandomBlock(blocks));
      setNextBlock(getRandomBlock(blocks));
    }
  }, [gameState]);
  function getRandomBlock(blocks) {
    const blocksArr = Object.keys(blocks);
    const randomNr = Math.floor(Math.random() * blocksArr.length);
    const randomBlock = blocksArr[randomNr];
    return randomBlock;
  }

  function draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMenu(ctx, nextBlock);
    drawCurrentBlock(ctx, currentBlockType);
  }

  return (
    <div className={styles.gameWindow}>
      <Canvas draw={draw} width={settings.canvasW} height={settings.canvasH} />
    </div>
  );
}

export default Tetris;
