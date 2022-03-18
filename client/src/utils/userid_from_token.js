import * as jose from 'jose';

export default function userid_from_token() {
  let token = localStorage.getItem('token');
  if (token == null) {
    return "";
  }

  const claims = jose.decodeJwt(token);
  return claims.sub;
}