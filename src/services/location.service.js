import axios from "axios";
import authHeader from "./auth-header";

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const API_URL = `${URL}/api/location/`;

class LocationService {

  //get
  getLocations() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getLocationById(locationId) {
    return axios.get(API_URL + `id/${locationId}`, { headers: authHeader() });
  }

  getLocationFields() {
    return axios.get(API_URL + "fields/", { headers: authHeader() });
  }
}

export default new LocationService();
