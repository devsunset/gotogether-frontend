import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ username, password }) {
    return api
      .post("/auth/signin", {
        username,
        password
      })
      .then((response) => {
        //alert(JSON.stringify(response.data));
        if (response.data.token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, nickname, email, password }) {
    return api.post("/auth/signup", {
      username,
      nickname,
      email,
      password
    });
  }
}

export default new AuthService();
