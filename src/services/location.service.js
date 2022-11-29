import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/locations/";

class LocationService {

  //get
  getLocations() {
    return axios.get(API_URL);
  }

  getLocationFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }
  
}

export default new LocationService();
