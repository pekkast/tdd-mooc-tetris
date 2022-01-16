export class Block {
  color;
  width = 1;
  height = 1;

  constructor(color) {
    this.color = color;
  }

  toString() {
    return this.color;
  }
}
