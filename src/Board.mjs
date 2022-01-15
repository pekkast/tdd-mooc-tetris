export class Board {
  width;
  height;
  matrix;
  dropX;
  dropY;

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
    this.matrix[this.dropY][this.dropX] = block;
  }

  dropped() {
    this.dropY = undefined;
    this.dropX = undefined;
  }

  hasFalling() {
    return typeof this.dropY === "number";
  }

  tick() {
    if (this.dropY + 1 === this.height) {
      return this.dropped();
    }

    const nextCell = this.matrix[this.dropY + 1][this.dropX];
    if (typeof nextCell !== "number") {
      return this.dropped();
    }

    this.matrix[this.dropY + 1][this.dropX] =
      this.matrix[this.dropY][this.dropX];
    this.matrix[this.dropY][this.dropX] = 0;
    this.dropY++;
  }

  toString() {
    return (
      this.matrix
        .map((row) =>
          row
            .map((cell) => (typeof cell === "number" ? "." : cell.color))
            .join("")
        )
        .join("\n") + "\n"
    );
  }
}
