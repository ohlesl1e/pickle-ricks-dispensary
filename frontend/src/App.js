import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Item from './pages/Item';
import { logout, setIsLoggedIn, setEmail, setUserType, setUser } from './redux/actions/userActions';
import Cart from './pages/Cart';
import { Nav, Navbar } from 'react-bootstrap';
import Checkout from './pages/Checkout';
import History from './pages/History';
import AddItem from './pages/AddItem';
import { retrieveUser, retrieveType, retrieveEmail } from './cookies';


const App = ({ isLoggedIn, dispatch, userType }) => {
  let seller = false;
  React.useEffect(() => {
    const user = retrieveUser()
    if (user) {
      dispatch(setEmail(retrieveEmail()))
      dispatch(setUserType(retrieveType()))
      dispatch(setUser(user))
      dispatch(setIsLoggedIn(true))
    }
  }, [])

  if(userType == 'Seller') { seller = true; }
  return (
    <div className="App">
      <nav className='nav-bar'>
        <div className="nav-wrapper">
          <Link to="/" className='nav-brand-logo'>Home</Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
           
            {isLoggedIn && (
                <li><Link id="logout" onClick={() => dispatch(logout())} to='/'>Logout</Link></li>
              )
            }
            {!isLoggedIn && (
                <li><Link to="/login">Login</Link></li>
              )
            }
            {!isLoggedIn && (
                <li><Link to="/signup">Sign up</Link></li>
              )
            }
            { seller &&
                 <li><Link to="/additem" className='nav-link'>Add item</Link></li>
            }
            <li><Link to="/cart"><i class="fas fa-shopping-cart"></i></Link></li>
          </ul>
        </div>
      </nav>
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
  isLoggedIn: state.userReducer.isLoggedIn,
  userType: state.userReducer.userType
})

export default connect(mapStateToProps)(App);