import React from 'react';
import { connect } from 'react-redux';
import {
  setUser,
  setPassword,
  create,
  setEmail,
  setUserType,
} from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Signup = ({
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
      <div className="col-xl-3 col-lg-5 col-md-8  vertical-center">
          <Row>
              <Form className="container login-form">
                  <h2 className="loginTitle">Sign Up</h2>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        <Form.Control type="text" name="email" className="login-input-email" value={email ? email : ''} placeholder="Email" onChange={e => dispatch(setEmail(e.target.value))}/>
                      </Col>
                  </Form.Group>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        <Form.Control type="text" name="fullname" className="login-input-password" value={user ? user : ''} placeholder="Full name" onChange={e => dispatch(setUser(e.target.value))}/>
                      </Col>
                  </Form.Group>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        <Form.Control type="password" name="password" className="login-input-password" value={password ? password : ''} placeholder="Password" onChange={e => dispatch(setPassword(e.target.value))}/>
                      </Col>
                  </Form.Group>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        <Form.Check
                          type="radio"
                          label="Buyer"
                          name="usertype"
                          id="formHorizontalRadios1"
                        />
                        <Form.Check
                          type="radio"
                          label="Seller"
                          name="usertype"
                          id="formHorizontalRadios2"
                        />
                      </Col>
                  </Form.Group>
                  <Form.Group controlId="form">
                      <Col className="login-form__control">
                        {loadingState === 'error' && <b>User name already exists</b>}
                        {loadingState === 'Not' && <b> enter a valid email- address </b>}
                        <Button variant="primary" type="submit" className="login-button" onClick={() => dispatch(create())}>Sign up</Button>
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

export default connect(mapStateToProps)(Signup);