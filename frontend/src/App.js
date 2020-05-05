import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Item from './pages/Item';
import { logout } from './redux/actions/userActions';
import Cart from './pages/Cart';

const App = ({ isLoggedIn, dispatch }) => {
  return (
    <div className="App">
      <nav className='navbar navbar-expand-sm bg-light'>
        <div className='container'>
          <ul className="navbar-nav">
            <li className='nav-item'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to='/cart' className='nav-link'>Cart</Link>
            </li>
            {isLoggedIn ?
              (<li className='nav-item'>
                <Link id="logout" className='nav-link' onClick={() => dispatch(logout())}>Logout</Link>
              </li>) :
              (<span>
                <li className='nav-item' style={{ display: 'inline-block' }}>
                  <Link to="/login" className='nav-link'>Login</Link>
                </li>
                <li className='nav-item' style={{ display: 'inline-block' }}>
                  <Link to="/signup" className='nav-link'>Sign up</Link>
                </li>
              </span>)
            }
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/item' component={Item} />
        <Route path='/cart' component={Cart} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(App);