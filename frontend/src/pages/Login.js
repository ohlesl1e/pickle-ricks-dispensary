//import './note.css';
import React from 'react';
import { connect } from 'react-redux';
import {
  setUser,
  setPassword,
  login,
  setEmail,
} from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';


const Login = ({
  user,
  password,
  isLoggedIn,
  loadingState,
  dispatch,
  email,
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
        <lable>Email:</lable>
        <input placeholder='email address'
          value={email}
          onChange={e => dispatch(setEmail(e.target.value))}
        />
      </div><br />
      <div>
        <lable>Password:</lable>
        <input placeholder='password'
          type="password"
          value={password}
          onChange={e => dispatch(setPassword(e.target.value))}
        />
      </div>
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
    email: state.userReducer.email,
    isLoggedIn: state.userReducer.isLoggedIn,
    loadingState: state.userReducer.loadingState,
  };
};

export default connect(mapStateToProps)(Login);