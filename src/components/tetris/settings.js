export const settings = {
  canvasW: 550,
  canvasH: 500,
  menuWidth: 200,
  gameAreaW: 300,
  menuText: 20,
  speed: 60, // 60 +/- 1 per second
  squareSize: 25,
};

export const settingsMobile = {};

export const nrOfBlocks = {
  x: settings.gameAreaW / settings.squareSize,
  y: settings.canvasH / settings.squareSize,
};
