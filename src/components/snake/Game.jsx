import React, { useState } from "react";
import { snake } from "./snake.js"
import { canvas } from "./Canvas"
import { keyDown, keyUp, UP, DOWN, LEFT, RIGHT } from "./keyboard.js"



function Game() {
  document.onkeydown = keyDown;
  document.onkeyup = keyUp;
  
  function draw(ctx) {
    drawSnake() {
      
    }
  }
  
  return(<Canvas 
    width={settings.canvasW}
    height={settings.canvasH}
  />)
}

export default Game