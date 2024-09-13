import React, { useRef } from "react";
import { useEffect } from "react";
import { handleStart, handleMove, handleEnd, handleCancel } from "./touch.js";

function Canvas(props) {
  const canvasRef = useRef(null);
  const { draw, collision, setCollision, width, height, ...rest } = props;

  function startup(canvas, ctx) {
    console.log("Initialized.");
    // const el = document.getElementById("brickCanvas");
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleCancel);
    canvas.addEventListener("touchmove", handleMove);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    startup(canvas, context);
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      // if (collision === true) {
      //   console.log("coll");
      //   window.cancelAnimationFrame(animationFrameId);
      //   // setCollision(false);
      //   return;
      // } else {
      animationFrameId = window.requestAnimationFrame(render);
      // }
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, collision]);

  return (
    <canvas
      id="brickCanvas"
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
}

export default Canvas;
