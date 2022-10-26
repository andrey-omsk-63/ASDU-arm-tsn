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

// export function mapCreate(dateMap: DateMAP) {
//   return {
//     type: MAP_CREATE,
//     data: { dateMap },
//   };
// }

// export function massrouteCreate(massRouter: DateRoute) {
//   return {
//     type: MASSROUTE_CREATE,
//     data: massRouter,
//   };
// }

// export function massrouteproCreate(massRouterPro: DateRoute) {
//   return {
//     type: MASSROUTEPRO_CREATE,
//     data: massRouterPro,
//   };
// }

// export function coordinatesCreate(Coordinates: Array<Array<number>>) {
//   return {
//     type: COORDINATES_CREATE,
//     data: Coordinates,
//   };
// }
