import api from './api';

class TogetherService {
  getRecentTogether() {
    return api.get('/memo/newreceive');
  }
}

export default new TogetherService (); 
