import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://db-x4jr.onrender.com/api/locations/";

class LocationService {

  //get
  getLocations() {
    return axios.get(API_URL);
  }

  getLocationById(locationId) {
    return axios.get(API_URL + `id/${locationId}`, { headers: authHeader() });
  }

  getLocationFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }
}

export default new LocationService();
