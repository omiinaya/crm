function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (user && user.accessToken) {
      console.log(user.accessToken)
      return { 'x-access-token': user.accessToken };
    } else {
      console.log(user)
      return {};
    }
  }

module.exports = { authHeader }