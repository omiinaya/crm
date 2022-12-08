import axios from 'axios';

class WarrantyService {
  //GET
  async getLenovoWarranty(serial) {
    const url = `https://xs-na-east.vercel.app/api/warranty?serial=${serial}`;
    const req = await axios.get(url)
    return req;
  }
}

export default new WarrantyService();