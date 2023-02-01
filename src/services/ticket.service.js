import axios from 'axios';
import authHeader from './auth-header';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const API_URL = `${URL}/api/ticket/`;

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

  getTicketByTechnician(ticketName) {
    return axios.get(API_URL + `technician/name/${ticketName}`, { headers: authHeader() });
  }

  getTicketFields() {
    return axios.get(API_URL + 'fields/', { headers: authHeader() });
  }

  //POST
  createTicket(data) {
    return axios.post(API_URL, data);
  }

  //PUT
  updateTicket(ticketId, data) {
    return axios.put(API_URL + `id/${ticketId}`, data);
  }
}

export default new TicketService();