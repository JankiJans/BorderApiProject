import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, legacy_createStore as createStore} from 'redux';

const rootReducer = combineReducers({});

const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
