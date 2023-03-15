import * as T from "@effect/io/Effect";

export type Command = "F" | "B" | "L" | "R";
export type Direction = "N" | "E" | "W" | "S";
export type Position = { x: number, y: number; };
export type Size = { width: number, height: number; };
export interface Planet {
  size: Size;
  obstacles: Position[];
}
export interface RoverState {
  position: Position;
  direction: Direction;
}

export const program = T.sync(() => console.log("hello"));

export function processCommand(state: RoverState, planet: Planet, command: Command) {
  switch (command) {
    case "F":
      return checkForCrashes({ direction: "N", position: { ...state.position, x: state.position.x + 1 } }, planet);
    case "B":
      return checkForCrashes({ direction: "S", position: { ...state.position, x: state.position.x - 1 } }, planet);
    case "L":
      return checkForCrashes({ direction: "E", position: { ...state.position, y: state.position.y - 1 } }, planet);
    case "R":
      return checkForCrashes({ direction: "W", position: { ...state.position, y: state.position.y + 1 } }, planet);
  }
}

export function processCommands(state: RoverState, planet: Planet, commands: Command[]) {
  return commands.reduce((acc, command) => T.runSync(processCommand(acc, planet, command)), state);
}

export function checkForCrashes(state: RoverState, planet: Planet) {
  const { x: a, y: b } = state.position;
  const crashed = planet.obstacles.some(({ x, y }) => a === x && b === y);

  if (crashed) {
    return T.fail(new Error(`Crashed at position [${a}, ${b}]`));
  }

  return T.succeed(state);
};
