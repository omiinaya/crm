import axios from 'axios';
import authHeader from './auth-header';

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:9000`;

const API_URL = `${URL}/api/ticket/`;

class TicketService {
  //GET
  getTickets() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getTicketById(Id) {
    return axios.get(API_URL + `id/${Id}`, { headers: authHeader() });
  }

  getTicketsByCustomer(customerId) {
    return axios.get(API_URL + `customer/id/${customerId}`, { headers: authHeader() });
  }

  getTicketByTechId(techId) {
    return axios.get(API_URL + `tech/id/${techId}`, { headers: authHeader() });
  }

  //should be using IDs instead of name
  getTicketByTechName(ticketName) {
    return axios.get(API_URL + `tech/name/${ticketName}`, { headers: authHeader() });
  }

  //implement this route
  getTicketsByAssetId(assetId) {
    return axios.get(API_URL + `asset/id/${assetId}`, { headers: authHeader() });
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