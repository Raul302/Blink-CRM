import React, {  useEffect,useReducer } from 'react';
import AppRouter  from './routers/AppRouter';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { authReducer } from '../src/auth/authReducer';

 const init = () => {
   return JSON.parse(localStorage.getItem('user')) || { logged: false };
 }


// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: 'top center',
  timeout: 5000,
  offset: '30px',
  type: 'error',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
   const [user, dispatch] = useReducer(authReducer, {},init);
  useEffect(() => {
    // localStorage.setItem( 'user', JSON.stringify(user));
  } , [
     user
  ]);
  return (
      <Provider store={store} >
        <AlertProvider template={AlertTemplate} {...options}>
      <AppRouter />
      </AlertProvider>
      </Provider>
  );
}

export default App; 
