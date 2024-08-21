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
      if (rId >= 1 && rId < 5) {
        // 6
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
        if (rId < 7 && rId > 0) {
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
      if (cId < 2 || cId > 8) {
        return { ...row };
      } else {
        if (
          (cId == 2 && rId >= 2 && rId <= 4) ||
          (cId == 3 && rId >= 1 && rId <= 6) ||
          (cId == 4 && rId >= 1 && rId <= 7) ||
          (cId == 5 && rId >= 2 && rId <= 8) ||
          (cId == 6 && rId >= 1 && rId <= 7) ||
          (cId == 7 && rId >= 1 && rId <= 6) ||
          (cId == 8 && rId >= 2 && rId <= 4)
        ) {
          return {
            ...row,
            painted: "strong",
          };
        } else {
          return { ...row };
        }
      }
    });
  });
  return bricks;
}

export function level4(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (rId == 1) {
        if (cId == 0 || cId == 10) {
          return {
            ...row,
            painted: "strong",
          };
        } else {
          return {
            ...row,
            painted: true,
          };
        }
      } else if (rId === 2) {
        if (cId == 1 || cId == 9 || cId == 0 || cId == 10) {
          return {
            ...row,
            painted: "strong",
          };
        } else {
          return {
            ...row,
            painted: true,
          };
        }
      } else if (rId === 3) {
        if (cId == 1 || cId == 2 || cId == 8 || cId == 9) {
          return {
            ...row,
            painted: "strong",
          };
        } else if (cId >= 3 && cId <= 7) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      } else if (rId === 4) {
        if (cId == 3 || cId == 7 || cId == 2 || cId == 8) {
          return {
            ...row,
            painted: "strong",
          };
        } else if (cId >= 4 && cId <= 6) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      } else if (rId == 6) {
        if (cId >= 4 && cId <= 6) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}

export function level5(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (rId == 1 || rId == 3 || rId == 5) {
        if (
          cId == 0 ||
          cId == 2 ||
          cId == 4 ||
          cId == 6 ||
          cId == 8 ||
          cId == 10
        ) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      } else if (rId == 2 || rId == 4) {
        if (cId == 1 || cId == 3 || cId == 5 || cId == 7 || cId == 9) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      } else if (rId == 6) {
        return {
          ...row,
          painted: "strong",
        };
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}

export function level6(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (cId == 0 || cId == 1 || cId == 6 || cId == 7) {
        if (rId >= 2 && rId <= 5) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 6) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else if (cId == 3 || cId == 4 || cId == 9 || cId == 10) {
        if (rId >= 1 && rId <= 3) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 4) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}

export function level7(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (cId == 0 || cId == 10) {
        if (rId >= 1 && rId <= 5) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 6) {
          return {
            ...row,
            painted: "strong",
          };
        } else {
          return { ...row };
        }
      } else if (cId == 1 || cId == 9) {
        if (rId >= 1 && rId <= 5) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 6) {
          return {
            ...row,
            painted: "strong",
          };
        } else {
          return { ...row };
        }
      } else if (cId == 2 || cId == 3 || cId == 7 || cId == 8) {
        if (rId >= 1 && rId <= 3) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 4) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else if (cId == 4 || cId == 6) {
        if (rId == 1) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 2) {
          return {
            ...row,
            painted: "strong",
          };
        } else {
          return { ...row };
        }
      } else if (cId == 5) {
        if (rId == 1) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}

export function level8(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (cId == 0 || cId == 10) {
        if (rId == 1 || rId == 3 || rId == 5) {
          return {
            ...row,
            painted: "solid",
          };
        } else if (rId == 2 || rId == 4) {
          return {
            ...row,
            painted: "strong",
          };
        } else {
          return { ...row };
        }
      }
      if (cId == 1 || cId == 2 || cId == 8 || cId == 9) {
        if (rId >= 1 && rId <= 5) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      } else if (cId == 3 || cId == 7) {
        if (rId == 1 || rId == 2 || rId == 4 || rId == 5) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 3) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else if (cId == 4 || cId == 6) {
        if (rId == 1 || rId == 2 || rId == 5) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 3) {
          return {
            ...row,
            painted: "strong",
          };
        } else if (rId == 4) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else if (cId == 5) {
        if (rId == 1 || rId == 2 || rId == 3) {
          return {
            ...row,
            painted: true,
          };
        } else if (rId == 4) {
          return {
            ...row,
            painted: "strong",
          };
        } else if (rId == 5) {
          return {
            ...row,
            painted: "solid",
          };
        } else {
          return { ...row };
        }
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}

export function level9(brick) {
  const brickBase = base(brick);

  const bricks = brickBase.map((col, cId) => {
    return col.map((row, rId) => {
      if (rId >= 1 && rId < 8) {
        // 6
        if (cId >= 4 && cId <= 7) {
          return {
            ...row,
            painted: true,
          };
        } else {
          return { ...row };
        }
      } else {
        return { ...row };
      }
    });
  });
  return bricks;
}
