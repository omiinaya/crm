import axios from 'axios';
import authHeader from './auth-header';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:9000`;

const API_URL = `${URL}/api/com/`;

class ComService {
  //GET
  getComs() {
    return axios.get(API_URL, { headers: authHeader() });
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
    return axios.post(API_URL, data, { headers: authHeader() });
  }
}

export default new ComService();