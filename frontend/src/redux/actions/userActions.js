import { setReceipts } from "./receiptActions";
import { saveCookie, deleteCookie } from "../../cookies";

export const setUser = user => ({
  type: 'USER_SET_USER',
  user,
});

export const setPassword = password => ({
  type: 'USER_SET_PASSWORD',
  password,
});

export const setIsLoggedIn = isLoggedIn => ({
  type: 'USER_SET_IS_LOGGED_IN',
  isLoggedIn,
});

export const setLoadingState = loadingState => ({
  type: 'USER_SET_LOADING_STATE',
  loadingState,
});

export const setStats = setStats => ({
  type: 'USER_SET_STATS',
  setStats,
})

export const login = () => (dispatch, getState) => {
  //console.log('login function');
  const reduxEvent = setLoadingState('loading'); // regular object
  //console.log(reduxEvent);
  // in order for redux to know something happened
  dispatch(reduxEvent); // now redux knows something is happening
  const userName = getState().userReducer.user;
  const userPassword = getState().userReducer.password;
  const url = '/api/auth/authenticate';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json'},
    body: JSON.stringify({ userId: userName, password: userPassword}),
  } 
  fetch(url, requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log('here');
      if(data.valid){
        saveCookie(userName)
        dispatch(setIsLoggedIn(true));
        dispatch(setLoadingState('init'));
      } else {
        dispatch(setLoadingState('error'));
      }
    })
    .catch(console.log);
};

export const logout = () => (dispatch, getState) => {
  deleteCookie()
  dispatch(setIsLoggedIn(false));
  dispatch(setUser(''));
  dispatch(setPassword(''));
  dispatch(setReceipts([]));
};

export const create = () => (dispatch, getState) => {
  const reduxEvent = setLoadingState('loading'); // regular object
  console.log(reduxEvent);
  // in order for redux to know something happened
  dispatch(reduxEvent); // now redux knows something is happening
  const userName = getState().userReducer.user;
  const userPassword = getState().userReducer.password;
  const url = '/api/auth/create';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json'},
    body: JSON.stringify({ userId: userName, password: userPassword}),
  } 
  fetch(url, requestOptions)
    .then(res => res.json())
    .then(data => {
      if(data.valid){
        dispatch(setIsLoggedIn(true));
        dispatch(setLoadingState('init'));
      } else {
        dispatch(setLoadingState('error'));
      }
    })
    .catch(console.log);
};

export const getStats = () => (dispatch, getState) => {
  const url = '/api/stats/get';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      dispatch(setStats(data.visits));
    })
    .catch(console.log);
}