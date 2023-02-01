import axios from "axios";
import authHeader from "./auth-header";

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const API_URL = `${URL}/api/home/`;

class NavService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getRoleNav(role) {
    return axios.get(API_URL + "role/" + role, { headers: authHeader() });
  }
}

export default new NavService();
