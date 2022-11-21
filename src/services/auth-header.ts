export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { 'x-access-token': '' + user.accessToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { "x-access-token": "" }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}