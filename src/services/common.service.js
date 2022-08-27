import api from "./api";

class CommonService {
  getHome() {
    return api.get("/common/home");
  }
}

export default new CommonService();
