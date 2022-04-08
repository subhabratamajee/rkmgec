import Router from 'next/router';
import Cookies from 'js-cookie';

import jwt from 'jsonwebtoken';
// import { token } from 'morgan';

const SECRET_KEY = process.env.SECRET_KEY;
// res.header(
//   'Access-Control-Expose-Headers',
//   'x-access-token, x-refresh-token'
// );
/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
// export async function verifyToken(req,res) {

//     let decoded;
//     const token = req.cookies.token;
//     console.log("tokeeeeeeeeeeeeeeeee"+token)
//     if (token) {
//       try {
//         decoded = jwt.verify(token, SECRET_KEY);
//       } catch (e) {
//         console.error(e);
//       }
//     }


//   try {
//     // token= req.headers.Cookies.token;
//     // var j = jwt.verify(token,SECRET_KEY);
//     var j = jwt.decode(token,SECRET_KEY);
//     console.log("okk")
//     return j;
//     console.log(j);
//   } catch (e) {
//     console.log('e:', e);
//     return null;
//   }

  // }



/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req) {
  const parsedItems = {};
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split('; ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
    // console.log(parsedItems)
  }
  return parsedItems;
  
}

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export function absoluteUrl(req, setLocalhost) {
  var protocol = 'https:';
  var host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host;
  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http:';
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
    url: req,
  };
}

/*
 * @params {none} set action for logout and remove cookie
 * @return {function} router function to redirect
 */
export function setLogout(e) {
  e.preventDefault();
  Cookies.remove('token');
  Router.push('/');
}