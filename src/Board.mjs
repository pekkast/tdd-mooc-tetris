export class Board {
  width;
  height;
  matrix;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.matrix = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill("."));
  }

  drop(block) {
    this.matrix[0][1] = block;
  }

  toString() {
    return (
      this.matrix
        .map((row) =>
          row
            .map((cell) => (typeof cell === "string" ? cell : cell.color))
            .join("")
        )
        .join("\n") + "\n"
    );
  }
}
