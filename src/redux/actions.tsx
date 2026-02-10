import { MASKPOINT_CREATE } from './types';
import { STATSAVE_CREATE } from './types';

import { Pointerr } from './../App';
import { Stater } from './../App';

export function maskpointCreate(maskPoint: Pointerr[] = []) {
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

