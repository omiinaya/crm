import axios from "axios";
import authHeader from "./auth-header";

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const API_URL = `${URL}/api/customer/`;

class CustomerService {

  //get
  getCustomers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getCustomerById(id) {
    return axios.get(API_URL + `id/${id}`, { headers: authHeader() });
  }

  getCustomerByAssetId(id) {
    return axios.get(API_URL + `asset/id/${id}`, { headers: authHeader() });
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
