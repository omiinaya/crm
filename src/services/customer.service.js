import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/customer/";

class CustomerService {
  getCustomerData() {
    return axios.get(API_URL);
  }

  createCustomer(data) {
    return axios.post(API_URL, data);
  }

  getCustomerFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }

  getCustomerSettingsFields() {
    return axios.get(API_URL + "settings/fields/", { headers: authHeader() });
  }
}

export default new CustomerService();
