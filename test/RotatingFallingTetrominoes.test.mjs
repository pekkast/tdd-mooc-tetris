import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotating falling tetrominoes", () => {
  let board;

  function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
      board.tick();
    }
  }

  function repeat(times, repeatable) {
    for (let i = 0; i < times; i++) {
      repeatable();
    }
  }

  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be rotated left when no space", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    repeat(4, () => board.moveLeft());
    repeat(3, () => board.tick());
    board.rotateLeft();
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       T.........
       TTT.......
       TTTT......`
    );
  });

  it("cannot be rotated right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be rotated left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();

    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...T......
       .TTTT.....
       TTT.......`
    );
  });

  it("cannot be rotated right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();

    board.rotateRight();
    board.rotateRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .....T....
       ....TTTT..
       ......TTT.`
    );
  });
});
