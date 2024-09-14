import { paddles } from "./paddles";
import { settings } from "./settings";
import { balls } from "./balls";
import { changePaused, paused } from "./pause";

export function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

const ongoingTouches = [];
let touchStartX = 0;
const pixelRatio = window.innerWidth / settings.canvasW;

export function handleStart(e) {
  e.preventDefault();

  // console.log(window);
  // console.log("touchstart.");
  const el = document.getElementById("brickCanvas");
  const touches = e.changedTouches;
  const canvasRect = el.getBoundingClientRect();

  if (balls[0].waiting) {
    balls[0].waiting = false;
  }
  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));

    // coords of touch
    const touchX = touches[i].pageX - canvasRect.left;
    const touchX2 = touchX + touches[i].radiusX;
    const touchY = touches[i].pageY - canvasRect.top;
    const touchY2 = touchY + touches[i].radiusY;
    const touchR = touches[i].radiusX;

    // coords of play/pause mobile button
    const playPauseX = (settings.canvasW / 2) * pixelRatio;
    const playPauseY = 18 * pixelRatio;
    const playPauseR = 15 * pixelRatio;
    const d = Math.sqrt(
      (touchX - playPauseX) * (touchX - playPauseX) +
        (touchY - playPauseY) * (touchY - playPauseY)
    );

    // console.log(touchX);
    console.log("y", touchY);
    console.log("padd", paddles[0].y * pixelRatio);
    // console.log(playPauseX);
    // console.log(touchY);
    // console.log(playPauseY);
    // console.log(paddles[0].x * pixelRatio);
    console.log(touches[i]);

    if (
      touchX2 >= paddles[0].x * pixelRatio &&
      touchX <= paddles[0].x * pixelRatio + paddles[0].w * pixelRatio &&
      touchY >= paddles[0].y * pixelRatio - 100 * pixelRatio
    ) {
      // check touch and paddle
      // console.log("padd");
      // console.log(canvasRect);
      touchStartX = touchX;
      // } else if (
      //   d <= touchR - playPauseR || d <= playPauseR - touchR || d < touchR + playPauseR || d === touchR + playPauseR
      // ) {
      // check touch and play/pause button

      // console.log(d);
      // console.log("touchR", touchR, "playPauseR", playPauseR);
    }
    if (
      d <= touchR - playPauseR ||
      d < touchR + playPauseR ||
      d < touchR + playPauseR ||
      d === touchR + playPauseR
    ) {
      changePaused(!paused);
      console.log("pause");
    }
    // if (d <= touchR - playPauseR) {
    //   console.log("Circle B is inside A");
    // } else if (d <= playPauseR - touchR) {
    //   console.log("Circle A is inside B");
    // } else if (d < touchR + playPauseR) {
    //   console.log("Circle intersect to each other");
    // } else if (d === touchR + playPauseR) {
    //   console.log("Circle touch to each other");
    // } else {
    //   console.log("Circle not touch to each other");
    // }
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

    if (
      touchX2 >= paddles[0].x * pixelRatio &&
      touchX <= paddles[0].x * pixelRatio + paddles[0].w * pixelRatio &&
      touchY >= paddles[0].y * pixelRatio - 100 * pixelRatio
    ) {
      const dx = touchX - touchStartX;
      const move = dx / pixelRatio;
      // move the paddle, don't go over the edges of the canvas
      if (move < 0) {
        if (paddles[0].x - move < 0) {
          paddles[0].x = 0;
        } else {
          paddles[0].x += dx / pixelRatio;
        }
      } else if (move >= 0) {
        if (paddles[0].x + paddles[0].w + move > settings.canvasW) {
          paddles[0].x = settings.canvasW - paddles[0].w;
        } else {
          paddles[0].x += dx / pixelRatio;
        }
      }
      console.log(move);

      // console.log("padd");
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
    if (
      touchX2 >= paddles[0].x * pixelRatio &&
      touchX <= paddles[0].x * pixelRatio + paddles[0].w * pixelRatio &&
      touchY >= paddles[0].y * pixelRatio - 100 * pixelRatio
    ) {
      const dx = touchX - touchStartX;
      const move = dx / pixelRatio;
      // move the paddle, don't go over the edges of the canvas
      if (move < 0) {
        if (paddles[0].x - move < 0) {
          paddles[0].x = 0;
        } else {
          paddles[0].x += dx / pixelRatio;
        }
      } else if (move >= 0) {
        if (paddles[0].x + paddles[0].w + move > settings.canvasW) {
          paddles[0].x = settings.canvasW - paddles[0].w;
        } else {
          paddles[0].x += dx / pixelRatio;
        }
      }
      // console.log("padd");
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
