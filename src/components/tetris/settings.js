export const settings = {
  canvasW: 550,
  canvasH: 500,
  menuWidth: 200,
  gameAreaW: 300,
  menuText: 20,
  speed: 20, // 60 +/- 1 per second
  squareSize: 25,
};

export const settingsMobile = {};

export const nrOfBlocks = {
  x: settings.gameAreaW / settings.squareSize,
  y: settings.canvasH / settings.squareSize,
};
let lines;
let level;

const sett = {
  rows: 22, // 2 hidden at the top,
  columns: 10,
  lvlup: 10 * lines
}

const scoring = {
  single: 40 * (level + 1), 
  double: 100 * (level + 1),
  triple: 30 * (level + 1),
  tetris: 1200 * (level + 1)
}


