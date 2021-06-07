import { reminderContactReducer } from '../reducers/contactsReducers/reminderContactReducer';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/auth/authReducer';
import { collegesReducer } from '../reducers/colleges/collegesReducer';
import { contactsReducer } from '../reducers/contactsReducers/contactsReducer';
import { uiReducer } from '../reducers/ui/uiReducer';
import { bioReducer } from 'reducers/contactsReducers/bioReducer';
import { staffReducer } from 'reducers/colleges/staffsReducer/staffReducer';
import { remindersCollegesReducer } from 'reducers/colleges/remindersColleges/remindersCollegesReducer';
import { userReducer } from 'reducers/users/userReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    remindersC: reminderContactReducer,
    auth: authReducer,
    ui : uiReducer,
    colleges: collegesReducer,
    contacts: contactsReducer,
    bioContact : bioReducer,
    staff: staffReducer,
    remindersColleges: remindersCollegesReducer,
    users : userReducer
    
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);