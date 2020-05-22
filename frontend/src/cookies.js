import Cookies from 'universal-cookie';

global.cookie = new Cookies();

export const saveUser = (value) => {
  const expires = new Date();
  expires.setDate(Date.now() + 60 * 60 * 4);
  global.cookie.set('user', value, {
    path: '/',
    expires,
    maxAge: 100000
  });
};

export const saveEmail = (value) => {
  const expires = new Date();
  expires.setDate(Date.now() + 60 * 60 * 4);
  global.cookie.set('email', value, {
    path: '/',
    expires,
    maxAge: 100000
  });
};

export const saveType = (value) => {
  const expires = new Date();
  expires.setDate(Date.now() + 60 * 60 * 4);
  global.cookie.set('type', value, {
    path: '/',
    expires,
    maxAge: 100000
  });
};

export const deleteCookie = () => {
  global.cookie.remove('user', {
    path: '/'
  });
  global.cookie.remove('email', {
    path: '/'
  });
  global.cookie.remove('type', {
    path: '/'
  });
};

export const retrieveUser = () => {
  if (global.cookie.get('user') !== null) {
    return global.cookie.get('user');
  } else return false;
};

export const retrieveEmail = () => {
  if (global.cookie.get('email') !== null) {
    return global.cookie.get('email');
  } else return false;
};

export const retrieveType = () => {
  if (global.cookie.get('type') !== null) {
    return global.cookie.get('type');
  } else return false;
};