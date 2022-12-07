import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/number/";

class NumberService {

  //get
  getNumber() {
    return axios.get(API_URL);
  }

  getNumberById(numberId) {
    return axios.get(API_URL + `id/${numberId}`, { headers: authHeader() });
  }

  getNumberFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }
  
}

export default new NumberService();
