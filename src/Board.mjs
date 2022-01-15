export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const row = Array(this.width).fill(".");
    return (
      Array(this.height)
        .fill(0)
        .map(() => row.join(""))
        .join("\n") + "\n"
    );
  }
}
