import React from 'react';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { setIsLoggedIn, setUser } from './redux/actions/userActions';
import { retrieveCookie } from './cookies';

const App = ({dispatch}) => {
  React.useEffect(() => {
    const user = retrieveCookie('user')
    if (user) {
      dispatch(setIsLoggedIn(true))
      dispatch(setUser(user))
    }
  }, [])
  return (
    <div className="App">
      <div className="nav-bar">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default connect()(App);