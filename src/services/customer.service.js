import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/customer/";

class CustomerService {

  //get
  getCustomers() {
    return axios.get(API_URL);
  }

  getCustomerFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }

  getCustomerSettingsFields() {
    return axios.get(API_URL + "settings/fields/", { headers: authHeader() });
  }

  //post
  createCustomer(data) {
    return axios.post(API_URL, data);
  }

  createCustomerSettings(data) {
    return axios.post(API_URL + "settings/", data);
  }

  createCustomerSettingsFields(data) {
    return axios.post(API_URL + "settings/fields/", data);
  }
  
}

export default new CustomerService();
