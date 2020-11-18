import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'

const {title, cookieExpires, useI18n} = config

export const TOKEN_KEY = 'token'


// token
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token !== null && token !== undefined && token !== '') {
    return token
  } else {
    return '';
  }
};


