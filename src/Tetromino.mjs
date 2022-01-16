import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;
  orientations;
  orientation;

  constructor(shape, orientations = 4, orientation = 0) {
    this.shape = shape;
    this.orientations = orientations;
    this.orientation = orientation;
  }

  get width() {
    return this.shape.width;
  }

  get height() {
    return this.shape.height;
  }

  clone() {
    return new Tetromino(
      new RotatingShape(this.shape.toString()),
      this.orientations,
      this.orientation
    );
  }

  rotateLeft() {
    if (this.orientations <= 2) {
      return this.rotateRight();
    }
    if (this.orientations === 1) {
      return this.clone();
    }
    return new Tetromino(
      this.shape.rotateLeft(),
      this.orientations,
      (this.orientation + 1) % this.orientations
    );
  }

  rotateRight() {
    if (this.orientations === 1) {
      return this.clone();
    }
    if (this.orientations < 4 && this.orientation + 1 === this.orientations) {
      return new Tetromino(
        this.shape.rotateLeft(),
        this.orientations,
        this.orientation - 1
      );
    }
    return new Tetromino(
      this.shape.rotateRight(),
      this.orientations,
      (this.orientation + 1) % this.orientations
    );
  }

  toString() {
    return this.shape.toString();
  }

  static T_SHAPE = new Tetromino(
    new RotatingShape(
      `.T.
       TTT
       ...`
    )
  );

  static I_SHAPE = new Tetromino(
    new RotatingShape(
      `.....
       .....
       IIII.
       .....
       .....`
    ),
    2
  );

  static O_SHAPE = new Tetromino(
    new RotatingShape(
      `.OO
       .OO
       ...`
    ),
    1
  );
}
