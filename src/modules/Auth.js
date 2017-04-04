class Auth {
  //auth and store token in local storage
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  //check is authenticated
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  //Deauth user remove token
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  //get a token value

  static getToken() {
    console.log('here')
    return localStorage.getItem('token');
  }
}

export default Auth;
