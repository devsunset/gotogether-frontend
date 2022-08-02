import api from './api';

class UserService {
  getNotice() {
    return api.get('/common/notice');
  }

  getPublicContent() {
    return api.get('/common/all');
  }

  getUserBoard() {
    return api.get('/common/user');
  }

  getModeratorBoard() {
    return api.get('/common/mod');
  }

  getAdminBoard() {
    return api.get('/common/admin');
  }
}

export default new UserService();
