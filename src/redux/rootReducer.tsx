import { combineReducers } from 'redux';

import { maskpointReducer } from './maskpointReducer';
import { statsaveReducer } from './statsaveReducer';

export const rootReducer = combineReducers({
  maskpointReducer,
  statsaveReducer,
});
