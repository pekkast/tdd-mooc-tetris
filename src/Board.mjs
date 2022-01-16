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
      .map(() => Array(this.width).fill(0));
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.dropX = Math.floor(this.width / 2);
    this.dropY = 0;
    this.block = block;
  }

  dropped() {
    this.matrix[this.dropY][this.dropX] = this.block;
    this.dropY = undefined;
    this.dropX = undefined;
    this.block = undefined;
  }

  hasFalling() {
    return typeof this.block !== "undefined";
  }

  tick() {
    if (this.dropY + 1 === this.height) {
      return this.dropped();
    }

    const nextCell = this.matrix[this.dropY + 1][this.dropX];
    if (typeof nextCell !== "number") {
      return this.dropped();
    }

    this.dropY++;
  }

  toString() {
    return (
      this.matrix
        .map((row, y) =>
          row
            .map((cell, x) =>
              this.hasFalling() && y === this.dropY && x === this.dropX
                ? this.block.toString()
                : typeof cell === "number"
                ? "."
                : cell.toString()
            )
            .join("")
        )
        .join("\n") + "\n"
    );
  }
}
