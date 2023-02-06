import axios from 'axios';
import authHeader from './auth-header';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const API_URL = `${URL}/api/asset/`;

class AssetService {
  //GET
  getAssets() {
    console.log(process.env)
    return axios.get(API_URL);
  }

  getAssetById(Id) {
    return axios.get(API_URL + `id/${Id}`, { headers: authHeader() });
  }

  getAssetsByCustomer(customerId) {
    return axios.get(API_URL + `customer/${customerId}`, { headers: authHeader() });
  }

  getAssetByTicketId(ticketId) {
    return axios.get(API_URL + `ticket/${ticketId}`, { headers: authHeader() });
  }

  getAssetFields() {
    return axios.get(API_URL + 'fields/', { headers: authHeader() });
  }

  //POST
  createAsset(data) {
    console.log(data)
    return axios.post(API_URL, data);
  }
}

export default new AssetService();