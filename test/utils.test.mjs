import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";
import { getBlockHeight, getBlockWidth } from "../src/utils.mjs";

describe("utils", () => {
  describe("getBlockHeight", () => {
    it("returns the longest row length", () => {
      const shape = new RotatingShape(
        `.T.
         TTT
         ...`
      );
      expect(getBlockHeight(shape)).to.equal(2);
    });

    it("handles empties", () => {
      const shape = new RotatingShape(
        `.T.
         .TT
         .T.`
      );
      expect(getBlockHeight(shape)).to.equal(3);
    });
  });

  describe("getBlockWidth", () => {
    it("returns the longest row length", () => {
      const shape = new RotatingShape(
        `.T.
         TTT
         ...`
      );
      expect(getBlockWidth(shape)).to.equal(3);
    });

    it("handles empties", () => {
      const shape = new RotatingShape(
        `.T.
         .TT
         .T.`
      );
      expect(getBlockWidth(shape)).to.equal(2);
    });
  });
});
