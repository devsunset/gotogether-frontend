import api from './api';

class TogetherService {
  getRecentTogether() {
    return api.get('/note/newreceivenote');
  }
}

export default new TogetherService (); 
