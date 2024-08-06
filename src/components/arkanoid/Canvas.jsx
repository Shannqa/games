import React, { useRef } from "react";
import { useEffect } from "react";
function Canvas(props) {
  const canvasRef = useRef(null);
  const { draw, collision, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      if (collision === true) {
        console.log("coll");
        window.cancelAnimationFrame(animationFrameId);
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

  return <canvas ref={canvasRef} width={400} height={300}></canvas>;
}

export default Canvas;
