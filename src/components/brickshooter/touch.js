import { paddles } from "./paddles";

export function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

const ongoingTouches = [];
let touchStartX = 0;

export function handleStart(e) {
  e.preventDefault();
  // console.log("touchstart.");
  const el = document.getElementById("brickCanvas");
  const touches = e.changedTouches;
  const canvasRect = el.getBoundingClientRect();
  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
    // const color = colorForTouch(touches[i]);
    // console.log(`color of touch with id ${touches[i].identifier} = ${color}`);
    // ctx.beginPath();
    const touchX = touches[i].pageX - canvasRect.left;
    const touchX2 = touchX + touches[i].radiusX;
    const touchY = touches[i].pageY - canvasRect.top;
    // ctx.arc(touchX, touchY, 4, 0, 2 * Math.PI, false); // a circle at the start
    // console.log(touches[i]);
    if (touchX2 >= paddles[0].x && touchX <= paddles[0].x + paddles[0].w) {
      console.log("padd");
      touchStartX = touchX;
    }
  }
}

export function handleMove(e) {
  e.preventDefault();
  const el = document.getElementById("brickCanvas");
  const ctx = el.getContext("2d");
  const touches = e.changedTouches;
  const canvasRect = el.getBoundingClientRect();

  for (let i = 0; i < touches.length; i++) {
    const idx = ongoingTouchIndexById(touches[i].identifier);

    const touchX = touches[i].pageX - canvasRect.left;
    const touchX2 = touchX + touches[i].radiusX;
    const touchY = touches[i].pageY - canvasRect.top;

    if (touchX2 >= paddles[0].x && touchX <= paddles[0].x + paddles[0].w) {
      const dx = touchX - touchStartX;
      paddles[0].x += dx;
      console.log("padd");
      touchStartX = touchX;
    }

    ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
  }
}

export function handleEnd(e) {
  e.preventDefault();
  // console.log("touchend");
  const el = document.getElementById("brickCanvas");
  const ctx = el.getContext("2d");
  const touches = e.changedTouches;
  const canvasRect = el.getBoundingClientRect();

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    const touchX = touches[i].pageX - canvasRect.left;
    const touchX2 = touchX + touches[i].radiusX;
    const touchY = touches[i].pageY - canvasRect.top;
    if (touchX2 >= paddles[0].x && touchX <= paddles[0].x + paddles[0].w) {
      const dx = touchX - touchStartX;
      paddles[0].x += dx;
      console.log("padd");
      touchStartX = touchX;
    }

    ongoingTouches.splice(idx, 1); // remove it; we're done
  }
}

export function handleCancel(e) {
  e.preventDefault();
  // console.log("touchcancel.");
  const touches = e.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
  }
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1; // not found
}
