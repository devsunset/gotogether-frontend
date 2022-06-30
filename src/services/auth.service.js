import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ userid, password }) {
    return api
      .post("/auth/signin", {
        userid,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ userid,username, email, password }) {
    return api.post("/auth/signup", {
      userid,
      username,
      email,
      password
    });
  }
}

export default new AuthService();
