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
    this.dropY++;
  }

  moveLeft() {
    if (!this.hasFalling()) {
      return;
    }

    if (this.dropX - Math.floor(this.block.width / 2) <= 0) {
      return;
    }

    this.dropX--;
  }

  moveRight() {
    if (!this.hasFalling()) {
      return;
    }

    if (this.dropX + Math.ceil(this.block.width / 2) >= this.width) {
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

    const nextCell =
      this.matrix[this.dropY + this.getBlockHeight()][this.dropX];
    if (nextCell !== EMPTY_CELL) {
      return this.dropped();
    }

    this.dropY++;
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
