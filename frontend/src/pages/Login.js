//import './note.css';
import React from 'react';
import { connect } from 'react-redux';
import {
  setUser,
  setPassword,
  login,
} from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';


const Login = ({
  user,
  password,
  isLoggedIn,
  loadingState,
  dispatch,
}) => {
  
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (loadingState === 'loading') {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2 className="loginTitle">Login</h2>
      <div>
        {/* this is a comment */}
        UserName: {" "}
        <input 
          value={user}
          onChange={e => dispatch(setUser(e.target.value))}
        />
      </div><br/>
      <div>
        Password: {" "}
        <input
          type="password"
          value={password}
          onChange={e => dispatch(setPassword(e.target.value))}
        />
      </div><br/>
      <div>
        {loadingState === 'error' && <b>User name or password incorrect</b>}
        <button className="login" onClick={() => dispatch(login())}>Log in</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  // this maps react props to redux state
  return {
    user: state.userReducer.user,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    loadingState: state.userReducer.loadingState,
  };
};

export default connect(mapStateToProps)(Login);