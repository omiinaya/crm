import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8090/api/asset/';

class AssetService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getAssetFields() {
    return axios.get(API_URL + 'fields/', { headers: authHeader() });
  }
}

export default new AssetService();