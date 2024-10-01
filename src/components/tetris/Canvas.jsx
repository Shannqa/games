import React, { useRef } from "react";
import { useEffect } from "react";
/* import {
  isTouchDevice,
  handleStart,
  handleMove,
  handleEnd,
  handleCancel,
} from "./touch.js"; */
import { settings, settingsMobile } from "./settings.js";

function Canvas({ draw, width, height }) {
  // + modal, setModal
  const canvasRef = useRef(null);
  
/*
  function handleTouches(canvas, ctx) {
    console.log("Initialized.");
    // const el = document.getElementById("brickCanvas");
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleCancel);
    canvas.addEventListener("touchmove", handleMove);
  }*/

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    /*if (isTouchDevice && !modal) {
      handleTouches(canvas, context);
    }*/

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

//  if (!isTouchDevice()) {
    return (
      <canvas
        id="brickCanvas"
        ref={canvasRef}
        width={width}
        height={settings.canvasH}
      ></canvas>
    );
/*  } else {
    return (
      <canvas
        id="brickCanvas"
        ref={canvasRef}
        width={width}
        height={settingsMobile.canvasH}
      ></canvas>
    );
  }*/
}

export default Canvas;
