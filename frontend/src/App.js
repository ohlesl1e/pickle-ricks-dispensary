import React from 'react';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Item from './pages/Item';

const App = () => {
  return (
    <div className="App">
      <nav className='navbar navbar-expand-sm bg-light'>
        <div className='container'>
          <ul className="navbar-nav">
            <li className='nav-item'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/login" className='nav-link'>Login</Link>
            </li>
            <li className='nav-item'>
              <Link to="/signup" className='nav-link'>Sign up</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/item' component={Item} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;