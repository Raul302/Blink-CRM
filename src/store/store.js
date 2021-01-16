import { reminderContactReducer } from '../reducers/contactsReducers/reminderContactReducer';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { collegesReducer } from '../reducers/collegesReducer';
import { contactsReducer } from '../reducers/contactsReducers/contactsReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    remindersC: reminderContactReducer,
    auth: authReducer,
    ui : uiReducer,
    colleges: collegesReducer,
    contacts: contactsReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);