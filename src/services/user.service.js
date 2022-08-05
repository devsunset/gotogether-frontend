import api from './api';

class UserService {
  getUserInfo() {
    return api.get('/userinfo/');
  }

  setUserInfoSave(reqData) {
    return api.post("/userinfo/",reqData );
  }

}

export default new UserService();
