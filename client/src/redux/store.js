import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, legacy_createStore as createStore} from 'redux';

import initialState from './initialState'
import usersReducer from './usersRedux';

const subreducers = {
  user: usersReducer
}
const reducer = combineReducers(subreducers);

const store = createStore (
  reducer, initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
  )
);
export default store;
