import axios from 'axios';

const COUNTRIES_URL = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json';
const STATES_URL = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json';
const CITY_URL = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json';

class CSCService {
  //GET
  getCountries() {
    return axios.get(COUNTRIES_URL);
  }

  getStates() {
    return axios.get(STATES_URL);
  }

  getCities() {
    return axios.get(CITY_URL);
  }

  async getCountryById(countryId) {
    const countries = await this.getCountries();
    const results = await countries.data.filter(country => country.country_id === countryId);
    return results;
  }

  async getStatesByCountry(countryId) {
    const states = await this.getStates();
    const results = await states.data.filter(state => state.country_id === countryId);
    return results;
  }

  async getCitiesByState(stateId) {
    const cities = await this.getCities();
    const results = await cities.data.filter(city => city.state_id === stateId);
    return results;
  }
}

export default new CSCService();