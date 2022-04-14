import { EMPTY_CELL } from "./constants.mjs";
import { getBlockHeight, getBlockPart, getBlockWidth } from "./utils.mjs";

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

    if (this.hasBlockerOnRight()) {
      return;
    }

    this.dropX++;
  }

  rotateLeft() {
    if (!this.hasFalling()) {
      return;
    }

    console.log("try", this.block, this.block.toString(), this.toString());

    if (
      this.hasBlockerOnLeft() &&
      this.getBlockHeight() > this.getBlockWidth()
    ) {
      console.log("blocked");
      return;
    }

    console.log("rotate");

    this.block = this.block.rotateLeft();
  }

  rotateRight() {
    if (!this.hasFalling()) {
      return;
    }

    this.block = this.block.rotateRight();
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
    return this.isBlockMovable(this.getBlockLeftOnRow, (x, y) => {
      if (x === 0) {
        return true;
      }

      return this.matrix[y][x - 1] !== EMPTY_CELL;
    });
  }

  getBlockLeftOnRow(row) {
    let col = 0;

    while (!this.isBlockCovered(row, col)) {
      col++;
    }

    console.log("left", row, col);
    return col;
  }

  hasBlockerOnRight() {
    return this.isBlockMovable(this.getBlockRightOnRow, (x, y) => {
      if (x + 1 === this.width) {
        return true;
      }

      return this.matrix[y][x + 1] !== EMPTY_CELL;
    });
  }

  getBlockRightOnRow(row) {
    let col = this.width - 1;

    while (!this.isBlockCovered(row, col)) {
      col--;
    }

    return col;
  }

  isBlockMovable(getBlockX, isTouching) {
    return this.getBlockSidePoints(getBlockX).reduce((hits, { x, y }) => {
      if (hits) {
        return true;
      }

      return isTouching(x, y);
    }, false);
  }

  getBlockSidePoints(getX) {
    const points = [];

    for (
      let row = this.dropY;
      row < this.dropY + this.getBlockHeight();
      row++
    ) {
      console.log("side", row);
      points.push({ y: row, x: getX.call(this, row) });
    }

    return points;
  }

  isBlockCovered(y, x) {
    return !!this.getBlockPart(y, x);
  }

  getBlockPart(row, col) {
    if (!this.hasFalling()) {
      return undefined;
    }

    return getBlockPart(this.block, { posX: this.dropX, posY: this.dropY })({
      row,
      col,
    });
  }

  getBlockHeight() {
    return getBlockHeight(this.block);
  }

  getBlockWidth() {
    return getBlockWidth(this.block);
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
