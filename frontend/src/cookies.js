import Cookies from 'universal-cookie';

global.cookie = new Cookies();

export const saveCookie = (value) => {
  const expires = new Date();
  expires.setDate(Date.now() + 60 * 60 * 4);
  global.cookie.set('user', value, {
    path: '/',
    expires,
    maxAge: 100000
  });
};

export const deleteCookie = (value) => {
  global.cookie.remove('user', {
    path: '/'
  });
};

export const retrieveCookie = (value) => {
  if (global.cookie.get('user') !== null) {
    return global.cookie.get('user');
    console.log();
  } else return false;
};
