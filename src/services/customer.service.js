import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/customer/";

class CustomerService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getCustomerFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }
}

export default new CustomerService();
