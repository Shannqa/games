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
  setLives: () => {},
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
    specialBricksPercent: 80,
  };

  const canvasW = settings.canvasW;
  const canvasH = settings.canvasH;
  let LEFT;
  let RIGHT;
  let powerUpReleased = false;
  let powerUpOn = false;
  let powerUpKind = null;

  const specialBricks = {
    bigPaddle: {
      desc: "paddle size x2",
      color1: "#2ea300",
      color2: "#6bb439",
      run() {
        paddle.w = paddle.w * 2;
      },
      stop() {
        paddle.w = paddle.w / 2;
      }
    },
    smallPaddle: {
      desc: "paddle size - 30%",
      color1: "#850000",
      color2: "#ac0404",
      run() {
        paddle.w = paddle.w * 0.7;
        
        setTimeout(() => smallPaddle.stop(), 10000)
      },
      stop() {
        paddle.w = paddle.w + paddle.w * 0.3;
      }
    },
    wormhole: {
      desc: "paddle can go through the wall and appear on the other side",
      color1: "#840075",
      color2: "#a0008d",
      run() {},
      stop() {
        if (!paddle1.active && paddle2.active) {
          // only second paddle active - make it the primary paddle
          paddle1.x = paddle2.x;
          paddle1.y = paddle2.y;
          paddle2.active = false;
        } else if (paddle1.active && paddle2.active) {
          // both paddles active and on screen - remove 2nd, move 1st to be fully within canvas
          paddle2.active = false;
          
          if (paddle1.x < 0) {
            paddle1.x = 0;
          } else if (paddle1.x + paddle1.w > settings.canvasW) {
            paddle1.x = settings.canvasW - paddle1.w
          }
        }
      },
    },
    twoBalls: "get another ball",
    tripleBalls: "get three balls",
    noDeath: "ball will bounce off the bottom of the canvas",
    bigBall: "ball size x2",
    smallBall: "ball size / 2",
    gunMode: "you can shoot bricks",
    stickyBall: "ball sticks to the paddle",
  };

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
    vx: 3,
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

  const paddle2 = {
    x: 0,
    y: paddle.y,
    w: paddle.w,
    h: paddle.h,
    vx: paddle.vx,
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

  const ball1 = {
    x: settings.canvasW / 2,
    y: paddle.y - 8,
    vx: 1,
    vy: -1,
    radius: 8,
    active: true,
    draw(ctx) {
      const radgrad = ctx.createRadialGradient(
        this.x,
        this.y,
        this.radius + 1,
        this.x,
        this.y,
        1
      );
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
  
  const ball2 = {
    x: settings.canvasW / 2,
    y: paddle.y - 8,
    vx: -1,
    vy: -1,
    radius: 8,
    active: false,
  }

  const powerUp = {
    x: 0,
    y: 0,
    vy: 0.9,
    w: 80,
    h: 20,
    draw(ctx, kind) {
      const gradient = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x + this.w,
        this.y + this.h
      );

      gradient.addColorStop(0, kind.color1);
      gradient.addColorStop(0.5, kind.color2);
      gradient.addColorStop(1, kind.color1);
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.fillStyle = gradient;
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    },
  };

  const brick = {
    w: 80,
    h: 20,
  };

  function buildBricks() {
    const bricks = [];
    for (let c = 0; c < 10; c++) {
      bricks[c] = [];
      for (let r = 0; r < 5; r++) {
        bricks[c][r] = {
          x: 0 + c * brick.w,
          y: 0 + r * brick.h,
          painted: true,
        };
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
          ctx.strokeStyle = "#000";
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
  
  
  function ballMoves() {
    // ball hiting edges of the canvas
    const balls = [ball1, ball2];
    const paddles = [paddle1, paddle2]
    
    balls.forEach((ball) => {
      if (ball.y + ball.vy > settings.canvasH - ball.radius) {
        // bottom of canvas, loss of ball
        ball.active = false;
        if (!balls[0].active && !balls[1].active) {
          // both balls fell down, loss of life
          setCollision(true);
          setLives(lives - 1);
          if (lives < 1) {
            loss();
          }
        }
        
      } else if (ball.y + ball.vy < ball.radius) {
        // top of canvas, reflect ball
        ball.vy = -ball.vy;
      } else if (
        ball.x + ball.vx > settings.canvasW - ball.radius ||
        ball.x + ball.vx < ball.radius
      ) {
        // right and left of canvas, reflect ball
        ball.vx = -ball.vx;
      }
    });
  }
  
  function paddleMoves() {
        // PADDLE WORMHOLE
    if (powerUpKind === "wormhole") {
      // wormhole enabled
      if (RIGHT === true) {
        paddle.x += paddle.vx;
      }
      if (paddle.x + paddle.w > settings.canvasW) {
        // paddle to the right of canvas boundary
        let leftX = settings.canvasW - paddle.x;
        paddle2.x = 0 - leftX;
        paddle2.draw(ctx);
      }
      if (LEFT === true) {
        paddle.x -= paddle.vx;
        paddle2.x -= paddle2.vx;
      }
      if (paddle.x < 0) {
        // paddle to the left of canvas boundary
        let rightX = 0 - paddle.x;
        paddle2.x = settings.canvasW - rightX;
        paddle2.draw(ctx);
      }
    } else {
      // paddle - normal moves
      if (RIGHT === true && paddle.x + paddle.w < settings.canvasW) {
        paddle.x += paddle.vx;
      }
      if (LEFT === true && paddle.x > 0) {
        paddle.x -= paddle.vx;
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

    ballMoves();
    
    // PADDLE
    paddle.draw(ctx);
    paddleMoves();

    // bounce: ball - paddle
    // problem, at the left corner the ball doesnt bounce
    if (
      ball.y + ball.radius >= paddle.y &&
      ball.y + ball.radius <= paddle.y + paddle.h &&
      // ball.y < paddle.y &&
      ball.x + ball.radius >= paddle.x &&
      ball.x - ball.radius <= paddle.x + paddle.w
    ) {
      ball.vy = -ball.vy;
    }

    // WORMHOLE, bounce ball vs paddle2
    if (
      ball.y + ball.radius >= paddle2.y &&
      ball.y < paddle2.y &&
      ball.x + ball.radius >= paddle2.x &&
      ball.x - ball.radius <= paddle2.x + paddle2.w
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
            const isSpecialBrick =
              !powerUpReleased &&
              Math.floor(Math.random() * 100) < settings.specialBricksPercent;
            if (isSpecialBrick) {
              console.log("sp");
              powerUpReleased = true;

              const keys = Object.keys(specialBricks);
              const random = Math.floor(Math.random() * 3);
              powerUpKind = specialBricks[keys[random]];

              console.log(powerUpKind);

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
      powerUp.draw(ctx, powerUpKind);
      powerUp.y += powerUp.vy;

      if (powerUp.y > canvasH) {
        // outside bottom canvas
        powerUpReleased = false;
      } else if (
        (powerUp.x + powerUp.w > paddle.x &&
          powerUp.x < paddle.x + paddle.w &&
          powerUp.y + powerUp.h > paddle.y &&
          powerUp.y > paddle.y) ||
        // wormhole
        (powerUp.x + powerUp.w > paddle2.x &&
          powerUp.x < paddle2.x + paddle2.w &&
          powerUp.y + powerUp.h > paddle2.y &&
          powerUp.y > paddle2.y)
      ) {
        // hit the paddle
        powerUpReleased = false;
        powerUpOn = true;
        powerUpKind.run();
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
        setLives,
      }}
    >
      <div>
        <div className={styles.menu}>
          <span>Lives: {lives}</span>
          <span>Score: {score}</span>
        </div>
        <Canvas
          draw={draw}
          collision={collision}
          setCollision={setCollision}
          width={settings.canvasW}
          height={settings.canvasH}
        />
        <Modal restart={restart} />
      </div>
    </ArkanoidContext.Provider>
  );
}

export default Game;
