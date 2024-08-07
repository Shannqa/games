import React, { useState, createContext } from "react";
import Canvas from "./Canvas";
import Modal from "./Modal";
import styles from "../../styles/arkanoid.module.css";


export const ArkanoidContext = createContext({
  gameStage: "",
  setGameStage: () => {},
  score: "",
  setScore: () => {},
  lives: "",
  setLives: () => {}
});

function Game() {
  const [collision, setCollision] = useState(false);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  // stages: "ready", "playing", "loss", "win"
  const [gameStage, setGameStage] = useState("ready");

  const settings = {
    lives: 3,
    canvasW: 800,
    canvasH: 450,
    scoreWeight: 10,
    specialBricksPercent: 80
  }

  const canvasW = settings.canvasW;
  const canvasH = settings.canvasH;
  let LEFT;
  let RIGHT;
  let powerUpReleased = false;
  let powerUpOn = false;
  const specialBricks = {
    bigPaddle: "paddle size x2",
    smallPaddle: "paddle size / 2",
    twoBalls: "get another ball",
    tripleBalls: "get three balls",
    wormhole: "paddle can go through the wall and appear on the other side",
    noDeath: "ball will bounce off the bottom of the canvas",
    bigBall: "ball size x2",
    smallBall: "ball size / 2",
    gunMode: "you can shoot bricks",
    stickyBall: "ball sticks to the paddle"
  }

  function start() {
    setGameStage("playing");
  }

  function restart() {
    setGameStage("ready");
    setLives(settings.lives);
    setScore(0);
  }

  function loss() {
    setGameStage("loss");
  }

  function win() {
    setGameStage("win");
  }

  document.onkeydown = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") LEFT = true;
    if (e.key === "Right" || e.key === "ArrowRight") RIGHT = true;
  };

  document.onkeyup = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
    if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
  };

  const paddle = {
    x: settings.canvasW / 2 - 35,
    y: settings.canvasH - 50,
    w: 70,
    h: 12,
    vx: 2,
    draw(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "#103549";
      ctx.fillStyle = "#234e66";
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    },
  };

  const ball = {
    x: settings.canvasW / 2,
    y: paddle.y - 8,
    vx: 1.2,
    vy: -1.2,
    radius: 8,
    draw(ctx) {
      const radgrad = ctx.createRadialGradient(this.x, this.y, this.radius + 1, this.x, this.y, 1);
      radgrad.addColorStop(0, "#dca85d");
      radgrad.addColorStop(0.5, "#dca85d");
      radgrad.addColorStop(0.9, "#f4d3a5");
      radgrad.addColorStop(1, "#fee8c9");
      ctx.beginPath();
      ctx.fillStyle = radgrad;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    },
  };

  const powerUp = {
    x: 0,
    y: 0,
    vy: 0.9,
    w: 80,
    h: 20,
    draw(ctx) {
      const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.w, this.y + this.h);
      gradient.addColorStop(0, "#2ea300");
      gradient.addColorStop(0.5, "#6bb439");
      gradient.addColorStop(1, "#2ea300");
      ctx.beginPath();
      ctx.strokeStyle = "#000"
      ctx.fillStyle = gradient;
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
}

const brick = {
  w: 80,
  h: 20
}

function buildBricks() {
  const bricks = [];
  for (let c = 0; c < 10; c++) {
    bricks[c] = [];
    for (let r = 0; r < 5; r++) {
      bricks[c][r] = { x: 0 + c * brick.w, y: 0 + r * brick.h, painted: true };
    }
  }
  return bricks;
}

let bricks = buildBricks();

  function drawBricks(ctx) {
    // bricks
    for (let c = 0; c < 10; c++) {
      for (let r = 0; r < 5; r++) {
        if (bricks[c][r].painted === true) {
          // brick is visible
          let xx = bricks[c][r].x;
          let yy = bricks[c][r].y;
          ctx.beginPath();
          ctx.strokeStyle = "#000"
          ctx.fillStyle = `rgb(${100 + c * 20}, ${10 + r * 30}, ${
            200 - c * 10
          })`;
          ctx.lineWidth = 2;
          ctx.rect(xx, yy, brick.w, brick.h);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function draw(ctx, frameCount) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // bricks
    drawBricks(ctx);

    // ball
    ball.draw(ctx);
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > settings.canvasH - ball.radius) {
      // bottom of canvas, loss
      setCollision(true);
      setLives(lives - 1);
      if (lives < 1) {
        loss();
      }
    }
    if (ball.y + ball.vy < ball.radius) {
      // top of canvas, reflect ball
      ball.vy = -ball.vy;
    }
    if (
      ball.x + ball.vx > settings.canvasW - ball.radius ||
      ball.x + ball.vx < ball.radius
    ) {
      // right and left of canvas, reflect ball
      ball.vx = -ball.vx;
    }

    // paddle
    paddle.draw(ctx);
    // move paddle
    if (RIGHT === true && paddle.x + paddle.w < settings.canvasW) {
      paddle.x += paddle.vx;
    }
    if (LEFT === true && paddle.x > 0) {
      paddle.x -= paddle.vx;
    }

    // bounce: ball - paddle
    if (
      // ball.y + ball.radius > paddle.y && // and maybe < paddle.y + paddle.h
      // ball.x > paddle.x &&
      // ball.x < paddle.x + paddle.w
      ball.y + ball.radius > paddle.y &&
      ball.y < paddle.y &&
      ball.x + ball.radius > paddle.x &&
      ball.x - ball.radius < paddle.x + paddle.w
    ) {
      ball.vy = -ball.vy;
    }

    
    function detectCollision(ballX, ballY) {
      // collision - ball - brick
      for (let c = 0; c < 10; c++) {
        for (let r = 0; r < 5; r++) {
          const br = bricks[c][r];
          if (
            br.painted === true &&
            ballX + ball.radius > br.x &&
            ballX - ball.radius < br.x + brick.w &&
            ballY + ball.radius > br.y &&
            ballY < br.y + brick.h // no radius
          ) {

            let newBricks = [...bricks];
            console.log(newBricks);
            newBricks[c][r].painted = false;
            console.log(newBricks[c][r]);
            
            // special bricks
            const isSpecialBrick = !powerUpReleased && Math.floor(Math.random() * 100) < settings.specialBricksPercent;
            if (isSpecialBrick) {
              console.log("sp");
              powerUpReleased = true;
              powerUp.x = br.x;
              powerUp.y = br.y;
            }
            ball.vy = -ball.vy;
          }
        }
      }
    }
    detectCollision(ball.x, ball.y);
    
    if (powerUpReleased) {
      powerUp.draw(ctx);
      powerUp.y += powerUp.vy;
      
      if (powerUp.y > canvasH) {
        // outside bottom canvas
        powerUpReleased = false;
      } else if (powerUp.x + powerUp.w > paddle.x && powerUp.x < paddle.x + paddle.w && powerUp.y + powerUp.h > paddle.y && powerUp.y > paddle.y) {
        // hit the paddle
        powerUpReleased = false;
        powerUpOn = true;
        console.log("powerup");
      }
    }
  }
  return (
    <ArkanoidContext.Provider
      value={{
      gameStage,
      setGameStage,
      score,
      setScore,
      lives,
      setLives
      }}
    >
    <div>
      <div className={styles.menu}>
        <span>Lives: {lives}</span>
        <span>Score: {score}</span>
      </div>
      <Canvas draw={draw} collision={collision} setCollision={setCollision} width={settings.canvasW} height={settings.canvasH} />
      <Modal restart={restart} />
    </div>
    </ArkanoidContext.Provider>
  );
}

export default Game;
