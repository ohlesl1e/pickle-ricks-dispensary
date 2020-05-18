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
import { Nav, Navbar } from 'react-bootstrap';
import Checkout from './pages/Checkout';
import History from './pages/History';
import AddItem from './pages/AddItem';


const App = ({ isLoggedIn, dispatch }) => {
  return (
    <div className="App">
      <Navbar variant='light' bg='light' expand='sm'>
        <div className='container'>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Link to="/" className='nav-link'>Home</Link>
              <Link to='/cart' className='nav-link'>Cart</Link>
              <Link to="/additem" className='nav-link'>Add item</Link>

              {isLoggedIn ?
                <Link id="logout" className='nav-link' onClick={() => dispatch(logout())} to='/'>Logout</Link> :
                (<Nav><Link to="/login" className='nav-link'>Login</Link>
                  <Link to="/signup" className='nav-link'>Sign up</Link>
                </Nav>)
              }
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Switch>
        <Route path="/History" component={History} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/item' component={Item} />
        <Route path='/cart' component={Cart} />
        <Route path='/checkout' component={Checkout} />
        <Route path="/additem" component={AddItem} />
        <Route path="/" component={Home} />  
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(App);