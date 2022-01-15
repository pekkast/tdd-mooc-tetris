export class RotatingShape {
  cells;

  constructor(content) {
    this.cells = content
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));
  }

  rotateRight() {
    const matrix = Array(this.cells.length)
      .fill(0)
      .map(() => Array(this.cells.length).fill(""));

    return new RotatingShape(
      this.matrixToString(
        this.cells
          .slice()
          .reverse()
          .reduce((matx, row, i) => {
            row.forEach((cell, j) => {
              matx[j][i] = cell;
            });
            return matx;
          }, matrix)
      )
    );
  }

  rotateLeft() {
    const matrix = Array(this.cells.length)
      .fill(0)
      .map(() => Array(this.cells.length).fill(""));

    return new RotatingShape(
      this.matrixToString(
        this.cells.reduce((matx, row, i) => {
          row
            .slice()
            .reverse()
            .forEach((cell, j) => {
              matx[j][i] = cell;
            });
          return matx;
        }, matrix)
      )
    );
  }

  matrixToString(matrix) {
    return matrix.map((cols) => cols.join("")).join("\n") + "\n";
  }

  toString() {
    return this.matrixToString(this.cells);
  }
}
