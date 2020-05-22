//import './note.css';
import React from 'react';
import { connect } from 'react-redux';
import {
  setPassword,
  login,
  setEmail,
} from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = ({
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
      <div className="col-xl-3 col-lg-5 col-md-8  vertical-center">
          <Row>
              <Form className="container login-form">
                  <h2 className="loginTitle">Login</h2>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        <Form.Control type="text" name="email" className="login-input-email" value={email ? email : ''} placeholder="Email" onChange={e => dispatch(setEmail(e.target.value))}/>
                      </Col>
                  </Form.Group>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        <Form.Control type="password" name="password" className="login-input-password" value={password ? password : ''} placeholder="Password" onChange={e => dispatch(setPassword(e.target.value))}/>
                      </Col>
                  </Form.Group>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        {loadingState === 'error' && <b>User name or password incorrect</b>}
                        <Button variant="primary" type="submit" className="login-button" onClick={() => dispatch(login())}>Log in</Button>
                      </Col>
                  </Form.Group>
              </Form>
          </Row>
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