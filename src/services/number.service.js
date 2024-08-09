import axios from "axios";
import authHeader from "./auth-header";

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:9000`;

const API_URL = `${URL}/api/number/`;

class NumberService {
  //get
  getNumber() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getNumberById(numberId) {
    return axios.get(API_URL + `id/${numberId}`, { headers: authHeader() });
  }

  getNumberFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }
}

export default new NumberService();
