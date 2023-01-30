import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://db-x4jr.onrender.com/api/home/";

class NavService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getRoleNav(role) {
    return axios.get(API_URL + "role/" + role, { headers: authHeader() });
  }
}

export default new NavService();
