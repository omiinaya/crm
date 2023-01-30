import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://db-x4jr.onrender.com/api/customers/";

class CustomerService {

  //get
  getCustomers() {
    return axios.get(API_URL);
  }

  getCustomerById(id) {
    return axios.get(API_URL + `id/${id}`, { headers: authHeader() });
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
