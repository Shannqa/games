function getFullCoords(start, size, direction) {
  // gets full coordinates of every square in a single ship
  const [r, c] = start;
  let fullCoords = [];

  if (direction === "vertical") {
    for (let i = r; i < r + size; i++) {
      fullCoords.push([i, c]);
    }
  } else if (direction === "horizontal") {
    for (let i = c; i < c + size; i++) {
      fullCoords.push([r, i]);
    }
  }
  return fullCoords;
}

export default getFullCoords;
