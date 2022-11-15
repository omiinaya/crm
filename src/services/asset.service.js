import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8090/api/asset/';

class AssetService {
  /*
  getAssets() {
    return axios.get(API_URL);
  }
  */
  getAssetFields() {
    return axios.get(API_URL + 'fields/', { headers: authHeader() });
  }

   //post
   createAsset(data) {
    console.log(data)
    return axios.post(API_URL, data);
  }
}

export default new AssetService();