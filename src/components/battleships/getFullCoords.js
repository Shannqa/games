function getFullCoords(start, size, direction) {
  // gets full coordinates of every square in a single ship
  const [x, y] = start;
  let fullCoords = [];
    
  if (direction === "vertical") {
    for (let i = x; i < x + size; i++) {
      fullCoords.push([i, y]);
    }
  } else if (direction === "horizontal") {
    for (let i = y; i < y + size; i++) {
      fullCoords.push([x, i]);
    }
  }
  return fullCoords;
}

export default getFullCoords