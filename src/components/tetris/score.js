const scoreValues = {
  1: 10,
  2: 40,
  3: 120,
  4: 300,
}

export function changeScore(setScore, newScore) {
  setScore(newScore);
}

export function resetScore(setScore) {
  setScore(0);
}