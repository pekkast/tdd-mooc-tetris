export const EMPTY_CELL = ".";

export class Board {
  width;
  height;
  matrix;
  dropX;
  dropY;
  block;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.matrix = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(EMPTY_CELL));
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.dropX = Math.ceil((this.width - block.width) / 2);
    this.dropY = 0;
    this.block = block;
  }

  dropped() {
    this.matrix.forEach((row, y) =>
      row.forEach((_, x) => {
        if (this.isBlockCovered(y, x)) {
          this.matrix[y][x] = this.getBlockPart(y, x);
        }
      })
    );
    this.dropY = undefined;
    this.dropX = undefined;
    this.block = undefined;
  }

  hasFalling() {
    return typeof this.block !== "undefined";
  }

  moveDown() {
    if (!this.hasFalling()) {
      return;
    }

    if (this.blockHitsFloor()) {
      return this.dropped();
    }

    if (this.hasBlockBelow()) {
      return this.dropped();
    }

    this.dropY++;
  }

  moveLeft() {
    if (!this.hasFalling()) {
      return;
    }

    if (this.hasBlockerOnLeft()) {
      return;
    }

    this.dropX--;
  }

  moveRight() {
    if (!this.hasFalling()) {
      return;
    }

    if (this.hasBlockOnRight()) {
      return;
    }

    this.dropX++;
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }

    if (this.blockHitsFloor()) {
      return this.dropped();
    }

    if (this.hasBlockBelow()) {
      return this.dropped();
    }

    this.dropY++;
  }

  hasBlockBelow() {
    return this.getBlockBottomPoints().reduce((hits, { x, y }) => {
      if (hits) {
        return true;
      }

      return this.matrix[y + 1][x] !== EMPTY_CELL;
    }, false);
  }

  getBlockBottomPoints() {
    const points = [];
    for (
      let row = this.dropY;
      row < this.dropY + this.getBlockHeight();
      row++
    ) {
      points.push(...this.getRowBottomPoints(row));
    }
    return points;
  }

  getRowBottomPoints(row) {
    let col = 0;
    const points = [];

    while (!this.isBlockCovered(row, col)) {
      col++;
    }

    while (this.isBlockCovered(row, col)) {
      if (!this.isBlockCovered(row + 1, col)) {
        points.push({ x: col, y: row });
      }
      col++;
    }

    return points;
  }

  hasBlockerOnLeft() {
    return this.getBlockSidePoints(this.getRowLeft).reduce((hits, { x, y }) => {
      if (hits) {
        return true;
      }

      if (x === 0) {
        return true;
      }

      return this.matrix[y][x - 1] !== EMPTY_CELL;
    }, false);
  }

  getRowLeft(row) {
    let col = 0;

    while (!this.isBlockCovered(row, col)) {
      col++;
    }

    return col;
  }

  hasBlockOnRight() {
    return this.getBlockSidePoints(this.getRowRight).reduce(
      (hits, { x, y }) => {
        if (hits) {
          return true;
        }

        if (x + 1 === this.width) {
          return true;
        }

        return this.matrix[y][x + 1] !== EMPTY_CELL;
      },
      false
    );
  }

  getRowRight(row) {
    let col = this.width - 1;

    while (!this.isBlockCovered(row, col)) {
      col--;
    }

    return col;
  }

  getBlockSidePoints(getX) {
    const points = [];
    for (
      let row = this.dropY;
      row < this.dropY + this.getBlockHeight();
      row++
    ) {
      points.push({ y: row, x: getX.call(this, row) });
    }
    return points;
  }

  isBlockCovered(y, x) {
    return !!this.getBlockPart(y, x);
  }

  getBlockPart(y, x) {
    if (!this.hasFalling()) {
      return undefined;
    }
    const blockY = y - this.dropY;
    if (blockY < 0 || blockY + 1 > this.block.height) {
      return undefined;
    }

    const blockX = x - this.dropX;
    const half = Math.floor(this.block.width / 2);
    if (Math.abs(blockX) > half) {
      return undefined;
    }

    const char = this.block.charAt(blockY, blockX + half);
    return char === EMPTY_CELL ? undefined : char;
  }

  getBlockHeight() {
    let left = this.block.height;

    while (left > 1) {
      for (let i = 0; i < this.block.width; i++) {
        if (this.block.charAt(left - 1, i) !== EMPTY_CELL) {
          return left;
        }
      }
      left--;
    }

    return left;
  }

  blockHitsFloor() {
    if (!this.hasFalling()) {
      return false;
    }

    const blockHeight = this.getBlockHeight();
    return this.dropY + blockHeight === this.height;
  }

  toString() {
    return (
      this.matrix
        .map((row, y) =>
          row
            .map((cell, x) =>
              this.isBlockCovered(y, x) ? this.getBlockPart(y, x) : cell
            )
            .join("")
        )
        .join("\n") + "\n"
    );
  }
}
