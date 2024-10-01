import React, { useState } from "react";
import Canvas from "./Canvas";
import { settings } from "./settings.js";
import { blocks } from "./blocks.js";
import { drawMenu } from "./menu.js"


function Tetris() {
  const [nextBlock, setNextBlock] = useState(null);
  
  function getRandomBlock(blocks) {
    const blocksArr = Object.keys(blocks);
    const randomNr = Math.floor(Math.random * blocksArr.length);
    const randomBlock = blocksArr[randomNr];
    return randomBlock;
  }
  
  function draw(ctx) {
    drawMenu(ctx, nextBlock);
  }
  
  return (
    <div className={styles.gameWindow}>
      <Canvas 
        draw={draw}
        width={settings.canvasW}
        height={settings.canvasH}
      />
    </div>
  );
}

export default Tetris;
