import { reminderContactReducer } from '../reducers/contactsReducers/reminderContactReducer';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/auth/authReducer';
import { collegesReducer } from '../reducers/colleges/collegesReducer';
import { contactsReducer } from '../reducers/contactsReducers/contactsReducer';
import { uiReducer } from '../reducers/ui/uiReducer';
import { bioReducer } from 'reducers/contactsReducers/bioReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    remindersC: reminderContactReducer,
    auth: authReducer,
    ui : uiReducer,
    colleges: collegesReducer,
    contacts: contactsReducer,
    bioContact : bioReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);