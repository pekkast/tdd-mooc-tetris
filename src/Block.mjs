export class Block {
  color;
  width = 1;
  height = 1;

  constructor(color) {
    this.color = color;
  }

  charAt(y, x) {
    return this.toString();
  }

  toString() {
    return this.color;
  }
}
