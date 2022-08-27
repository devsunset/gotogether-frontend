import api from "./api";
import Common from "./common.js";

class UserService {
  getUserInfo() {
    return api.get("/userinfo/");
  }

  setUserInfoSave(reqData) {
    return api.post("/userinfo/", Common.preRequestHandler(reqData));
  }

  getUserInfoList(page, size, reqData) {
    return api.post("/userinfo/list?page=" + page + "&size=" + size, reqData);
  }
}

export default new UserService();
