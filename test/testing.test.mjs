import { expect } from "chai";
import { normalize } from "./testing.mjs";

describe("testing", () => {
  describe("normalize", () => {
    it("adds line end", () => {
      expect(normalize("")).to.equal("\n");
    });

    it("removes whitespace from start and end", () => {
      expect(normalize("  x  ")).to.equal("x\n");
    });

    it("handles line ends in middle of string", () => {
      expect(normalize("   x\n   x")).to.equal("x\nx\n");
    });

    it("does not add additional line ending", () => {
      expect(normalize("   x\n   x\n")).to.equal("x\nx\n");
    });

    it("removes line ending from start", () => {
      expect(normalize("\n   x\n   x")).to.equal("x\nx\n");
    });
  });
});
