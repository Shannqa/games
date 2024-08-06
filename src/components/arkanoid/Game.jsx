import React, { useState } from "react";
import Canvas from "./Canvas";

function Game() {
  const [collision, setCollision] = useState(false);
  const canvasW = 400;
  const canvasH = 300;
  let LEFT;
  let RIGHT;
  document.onkeydown = function (e) {
    if (e.keyCode === 37) LEFT = true;
    if (e.keyCode === 39) RIGHT = true;
  };

  document.onkeyup = function (e) {
    if (e.keyCode === 37) LEFT = false;
    if (e.keyCode === 39) RIGHT = false;
  };

  const ball = {
    x: canvasW / 2,
    y: canvasH - 50,
    vx: 1,
    vy: -1,
    radius: 5,
    color: "blue",
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    },
  };

  const paddle = {
    x: canvasW / 2 - 30,
    y: canvasH - 45,
    w: 60,
    h: 5,
    vx: 2,
    draw(ctx) {
      ctx.fillRect(this.x, this.y, this.w, this.h);
    },
  };

  const block = {
    x: 0,
    y: 0,
    w: 50,
    h: 20,
    draw(ctx, i, j) {
      ctx.fillRect(this.x + j * this.w, this.y + i * this.h, this.w, this.h);
    },
  };

  function draw(ctx, frameCount) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // blocks
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 8; j++) {
        ctx.fillStyle = `rgb(${100 + i * 30}, ${10 + j * 30}, ${20 + i * 15})`;
        block.draw(ctx, i, j);
      }
    }

    // ball
    ball.draw(ctx);
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvasH - ball.radius) {
      // loss
      setCollision(true);
      console.log("loss");
    }
    if (ball.y + ball.vy < ball.radius) {
      ball.vy = -ball.vy;
    }
    if (
      ball.x + ball.vx > canvasW - ball.radius ||
      ball.x + ball.vx < ball.radius
    ) {
      ball.vx = -ball.vx;
    }

    paddle.draw(ctx);
    // move paddle
    if (RIGHT === true) {
      paddle.x += paddle.vx;
    }
    if (LEFT === true) {
      paddle.x -= paddle.vx;
    }

    // collision ball - paddle
    if (
      ball.y === paddle.y &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.w
    ) {
      ball.vy = -ball.vy;
    }
  }
  return <Canvas draw={draw} collision={collision} />;
}

export default Game;
