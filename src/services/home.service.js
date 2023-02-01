import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost/api/home/";

class NavService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getRoleNav(role) {
    return axios.get(API_URL + "role/" + role, { headers: authHeader() });
  }
}

export default new NavService();
