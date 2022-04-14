import { EMPTY_CELL } from "./constants.mjs";

export const getBlockHeight = (block) => {
  let col = block.width;
  let max = 0;
  while (col > 0) {
    let height = 0;
    for (let i = 0; i < block.height; i++) {
      if (block.charAt(i, col - 1) !== EMPTY_CELL) {
        height++;
      }
    }
    max = Math.max(max, height);
    col--;
  }

  return max;
};

export const getBlockWidth = (block) => {
  let row = block.height;
  let max = 0;
  while (row > 0) {
    let width = 0;
    for (let i = 0; i < block.width; i++) {
      if (block.charAt(row - 1, i) !== EMPTY_CELL) {
        width++;
      }
    }
    max = Math.max(max, width);
    row--;
  }

  return max;
};

export const getBlockPart =
  (block, { posX, posY }) =>
  ({ col, row }) => {
    const blockY = row - posY;
    if (blockY < 0 || blockY + 1 > block.height) {
      return undefined;
    }

    const blockX = col - posX;
    const half = Math.floor(block.width / 2);
    if (Math.abs(blockX) > half) {
      return undefined;
    }

    const char = block.charAt(blockY, blockX + half);
    return char === EMPTY_CELL ? undefined : char;
  };
