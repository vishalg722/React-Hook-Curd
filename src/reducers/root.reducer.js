import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { routeReducer } from './route.reducer';

import { routeUpdate } from './route.update.reducer';
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  routeReducer,
  routeUpdate
});

export default rootReducer;