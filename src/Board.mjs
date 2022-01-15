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
    if (typeof this.dropY === "number") {
      throw new Error("already falling");
    }
    this.dropX = Math.floor(this.width / 2);
    this.dropY = 0;
    this.matrix[this.dropY][this.dropX] = block;
  }

  tick() {
    this.matrix[this.dropY + 1][this.dropX] =
      this.matrix[this.dropY][this.dropX];
    this.matrix[this.dropY][this.dropX] = 0;
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
