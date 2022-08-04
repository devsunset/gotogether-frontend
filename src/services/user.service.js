import api from './api';

class UserService {
  getUserInfo() {
    return api.get('/userinfo/');
  }
}

export default new UserService();
