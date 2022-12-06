import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8090/api/ticket/';

class TicketService {
  //GET
  getTickets() {
    return axios.get(API_URL);
  }

  getTicketsByCustomer(customerId) {
    return axios.get(API_URL + `customer/${customerId}`, { headers: authHeader() });
  }

  getTicketById(ticketId) {
    return axios.get(API_URL + `id/${ticketId}`, { headers: authHeader() });
  }

  getTicketFields() {
    return axios.get(API_URL + 'fields/', { headers: authHeader() });
  }

  //POST
  createTicket(data) {
    return axios.post(API_URL, data);
  }
}

export default new TicketService();