import api from './api';

class UserService {
  getUser() {
    return api.get('/common/all');
  }
}

export default new UserService();
