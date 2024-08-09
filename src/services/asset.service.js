import axios from 'axios';
import authHeader from './auth-header';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:9000`;

const API_URL = `${URL}/api/asset/`;

class AssetService {
  //GET
  getAssets() {
    return axios.get(API_URL, { headers: authHeader() });
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
    return axios.post(API_URL, data);
  }
}

export default new AssetService();