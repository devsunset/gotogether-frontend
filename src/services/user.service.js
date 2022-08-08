import api from './api';

class UserService {
  getUserInfo() {
    return api.get('/userinfo/');
  }

  setUserInfoSave(reqData) {
    return api.post("/userinfo/",reqData );
  }

  getUserInfoList(page,size,reqData) {
    return api.post("/userinfo/list?page="+page+"&size="+size,reqData );
  }

}

export default new UserService();
