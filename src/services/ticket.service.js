import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8090/api/ticket/';

class TicketService {
  //GET
  getTickets() {
    return axios.get(API_URL);
  }

  getTicketFields() {
    return axios.get(API_URL + 'fields/', { headers: authHeader() });
  }

  //POST
  createTicket(data) {
    console.log(data)
    return axios.post(API_URL, data);
  }
}

export default new TicketService();