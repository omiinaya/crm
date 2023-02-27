import axios from 'axios';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const API_URL = `${URL}/api/auth/`;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.removeItem('history');
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('history');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();