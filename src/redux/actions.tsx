import { MASKPOINT_CREATE } from "./types";

import { Pointer } from "./../App";

export function maskpointCreate(maskPoint: Pointer[] = []) {
  return {
    type: MASKPOINT_CREATE,
    data: maskPoint,
  };
}
