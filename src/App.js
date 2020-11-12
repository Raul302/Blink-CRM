// import logo from './logo.svg';
import './App.css';
import NavBar  from './components/NavBar';
import { BrowserRouter as Router, Switch, 
Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Report from './pages/Report';
import Contacts from './pages/Contacts';

function App() {
  return (
   <> 
   <Router>
     <NavBar />
     <Switch>
     <Route path="/" exact component={Dashboard}/>
     <Route path="/users"  component={Users}/>
     <Route path="/contacts"  component={Contacts}/>
     <Route path="/reports"  component={Report}/>
     </Switch>
   </Router>
   </>
  );
}

export default App;
