import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://db-x4jr.onrender.com/api/com/';

class ComService {
  //GET
  getComs() {
    return axios.get(API_URL);
  }

  getComById(id) {
    return axios.get(API_URL + `id/${id}`, { headers: authHeader() });
  }

  getComsByAuthorId(authorId) {
    return axios.get(API_URL + `author/${authorId}`, { headers: authHeader() });
  }

  getComsByTicketId(ticketId) {
    return axios.get(API_URL + `ticket/${ticketId}`, { headers: authHeader() });
  }

  getComFields() {
    return axios.get(API_URL + 'fields/', { headers: authHeader() });
  }

  //POST
  createCom(data) {
    return axios.post(API_URL, data);
  }
}

export default new ComService();