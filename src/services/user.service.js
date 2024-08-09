
import axios from 'axios';
import authHeader from './auth-header';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:9000`;

const API_URL = `${URL}/api/users`;

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  async getTechnicians() {
    const res = await axios.get(API_URL, { headers: authHeader() });
    const users = res.data;
    const techs = users.filter(user => user.roleId < 5 && user.roleId > 0);
    return techs;
  }

  async getTechById(id) {
    const res = await axios.get(`${API_URL}/tech/id/${id}`, { headers: authHeader()});
    const tech = res.data;
    return tech;
  }
}

export default new UserService();