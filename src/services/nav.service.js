import axios from 'axios';
import authHeader from './auth-header';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const API_URL = `${URL}/api/nav/`;

class NavService {
  getPublicContent() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getRoleNav(roleId) {
    return axios.get(API_URL + 'role/' + roleId, { headers: authHeader() });
  }
}

export default new NavService();