import axios from 'axios';
//import authHeader from './auth-header';

const API_URL = 'http://localhost:15169/api/businesses/';

class BusinessService {
  getBusinesses() {
    return axios.get(API_URL);
  }
}

export default new BusinessService();