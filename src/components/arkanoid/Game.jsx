import React, { useState, createContext } from "react";
import Canvas from "./Canvas";
import Modal from "./Modal";


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
  // const [bricks, setBricks] = useState(() => buildBricks());

const settings = {
  lives: 3,
  ballSpeed: 1,
  paddleSpeed: 1,
  canvasW: 400,
  canvasH: 300,
  scoreWeight: 10
}

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

  const canvasW = 400;
  const canvasH = 300;
  let LEFT;
  let RIGHT;
  document.onkeydown = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") LEFT = true;
    if (e.key === "Right" || e.key === "ArrowRight") RIGHT = true;
  };

  document.onkeyup = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
    if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
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

  function buildBricks() {
    const bricks = [];
    for (let c = 0; c < 8; c++) {
      bricks[c] = [];
      for (let r = 0; r < 5; r++) {
        bricks[c][r] = { x: 0 + c * 50, y: 0 + r * 20, painted: true };
      }
    }
    return bricks;
  }
  let bricks = buildBricks();

  function drawBricks(ctx) {
    // blocks
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 5; r++) {
        // console.log(bricks);
        if (bricks[c][r].painted === true) {
          let xx = bricks[c][r].x;
          let yy = bricks[c][r].y;
          ctx.beginPath();
          ctx.rect(xx, yy, 50, 20);
          ctx.fillStyle = `rgb(${100 + c * 20}, ${10 + r * 30}, ${
            200 - c * 10
          })`;
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function draw(ctx, frameCount) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawBricks(ctx);

    // ball
    ball.draw(ctx);
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvasH - ball.radius) {
      // loss
      setCollision(true);
      setLives(lives - 1);
      if (lives < 1) {
        loss();
      }
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
    if (RIGHT === true && paddle.x + paddle.w < canvasW) {
      paddle.x += paddle.vx;
    }
    if (LEFT === true && paddle.x > 0) {
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

    function detectCollision(ballX, ballY) {
      for (let c = 0; c < 8; c++) {
        for (let r = 0; r < 5; r++) {
          const brick = bricks[c][r];
          if (
            brick.painted === true &&
            ballX > brick.x &&
            ballX < brick.x + 50 &&
            ballY > brick.y &&
            ballY < brick.y + 20
          ) {
            let newBricks = [...bricks];
            console.log(newBricks);
            newBricks[c][r].painted = false;
            console.log(newBricks[c][r]);
            // setBricks([...newBricks]);
            ball.vy = -ball.vy;
          }
        }
      }
    }
    detectCollision(ball.x, ball.y);
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
      <Canvas draw={draw} collision={collision} setCollision={setCollision} />
      <Modal restart={restart} />
    </div>
    </ArkanoidContext.Provider>
  );
}

export default Game;
