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
import History from './pages/Purchasehistory';


const App = ({ isLoggedIn, dispatch }) => {
  return (
    <div className="App">
      <nav className='nav-bar'>
        <div className="nav-wrapper">
          <a href="#" class="brand-logo">Home</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">

            <li><input type='text'className='search' placeholder='Search'/></li>
            <li><a href="sass.html">Login</a></li>
            <li><a href="badges.html">Signup</a></li>
            <li><a href="collapsible.html"><i class="fas fa-shopping-cart"></i></a></li>
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
