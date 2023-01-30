import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://db-x4jr.onrender.com/api/asset/';

class AssetService {
  //GET
  getAssets() {
    return axios.get(API_URL);
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