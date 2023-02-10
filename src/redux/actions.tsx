import { MASKPOINT_CREATE } from './types';
import { STATSAVE_CREATE } from './types';

import { Pointer } from './../App';
import { Stater } from './../App';

export function maskpointCreate(maskPoint: Pointer[] = []) {
  return {
    type: MASKPOINT_CREATE,
    data: maskPoint,
  };
}

export function statsaveCreate(dateStat: Stater) {
  return {
    type: STATSAVE_CREATE,
    data: dateStat,
  };
}

