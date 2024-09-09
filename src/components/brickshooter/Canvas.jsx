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
