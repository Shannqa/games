import React, { useRef } from "react";
import { useEffect } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);
  const { draw, collision, setCollision, width, height, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    let frameLimit = 10;

    const render = () => {
      frameCount++;
      if (frameCount % frameLimit === 0) {
        draw(context, frameCount);
      }
      if (collision === true) {
        window.cancelAnimationFrame(animationFrameId);
        // setCollision(false);
        return;
      } else {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, collision]);

  return (
    <canvas id="canvas" ref={canvasRef} width={width} height={height}></canvas>
  );
}

export default Canvas;
