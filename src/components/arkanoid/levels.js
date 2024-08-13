import { brick } from "./bricks";

export function base(brick) {
  const bricks = [];
  for (let c = 0; c < 11; c++) {
    bricks[c] = [];
    for (let r = 0; r < 11; r++) {
      bricks[c][r] = {
        x: 0 + c * brick.w,
        y: 0 + r * brick.h,
        painted: false,
      };
    }
  }
  return bricks;
}

export function level1(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (rId > 0 && rId < 2) {
        return {
          ...row,
          painted: true,
        };
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}

export function level2(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (
        cId == 0 ||
        cId == 2 ||
        cId == 4 ||
        cId == 6 ||
        cId == 8 ||
        cId == 10
      ) {
        if (rId < 7) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      } else {
        if (rId == 5) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 6) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      }
    });
  });
  return bricks;
}

export function level3(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (rId < 11) {
        return {
          ...row,
          painted: true,
        };
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}
