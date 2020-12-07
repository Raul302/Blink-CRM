import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { contactsReducer } from '../reducers/contactsReducer';

const composeEnhancers = (typeof windows !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);
const reducers = combineReducers({
// auth: authReducers,
    contacts : contactsReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk)
    )
    );