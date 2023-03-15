import * as EF from "@effect/io/Effect";
import { program } from "./program";

EF.runFork(program);
