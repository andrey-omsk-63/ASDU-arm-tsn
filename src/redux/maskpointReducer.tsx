import { MASKPOINT_CREATE } from './types';
import { maskPoint } from './../App';

const intialState = {
  maskpoint: maskPoint,
};

export const maskpointReducer = (state = intialState, action: any) => {
  //console.log('maskpointReducer:', action);
  switch (action.type) {
    case MASKPOINT_CREATE:
      return {
        ...state,
        maskpoint: action.data,
      };

    default:
      return state;
  }
};
