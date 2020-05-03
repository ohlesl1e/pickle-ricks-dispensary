import React from 'react';
import { connect } from 'react-redux';
import {
  setUser,
  setPassword,
  create,
} from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';

const Signup = ({
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
      <h2>Sign up</h2>
      <div>
        {/* this is a comment */}
        User:
        <input
          value={user}
          onChange={e => dispatch(setUser(e.target.value))}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => dispatch(setPassword(e.target.value))}
        />
      </div>
      <div>
        {loadingState === 'error' && <b>User name already exists</b>}
        <button id="signup" onClick={() => dispatch(create())}>Sign up</button>
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

export default connect(mapStateToProps)(Signup);