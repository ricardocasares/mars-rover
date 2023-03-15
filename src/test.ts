import test from "node:test";
import assert from "node:assert";
import { Planet, processCommands, RoverState } from "./program";

const rover: RoverState = {
  position: {
    x: 0, y: 0
  },
  direction: "N",
};

const planet: Planet = {
  size: {
    width: 20,
    height: 20,
  },
  obstacles: [{ x: 4, y: 2 }]
};

test("moves forward", () =>
  assert
    .deepEqual(
      processCommands(rover, planet, ["F"]), { position: { x: 1, y: 0 }, direction: "N" })
);

test("moves backward", () =>
  assert
    .deepEqual(
      processCommands(rover, planet, ["B"]), { position: { x: -1, y: 0 }, direction: "S" })
);

test("moves left", () =>
  assert
    .deepEqual(
      processCommands(rover, planet, ["L"]), { position: { x: 0, y: -1 }, direction: "E" })
);

test("moves right", () =>
  assert
    .deepEqual(
      processCommands(rover, planet, ["R"]), { position: { x: 0, y: 1 }, direction: "W" })
);

test("moves forward twice and then left", () =>
  assert
    .deepEqual(
      processCommands(rover, planet, ["F", "F", "L"]), { position: { x: 2, y: -1 }, direction: "E" })
);

test("crashes when hitting an obstacle", () =>
  assert
    .throws(
      () => processCommands(rover, planet, ["F", "F", "F", "F", "R", "R"]),
      Error("Crashed")
    )
);
