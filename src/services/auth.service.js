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
        //alert(JSON.stringify(response.data.data));
        if (response.data.data.token) {
          TokenService.setUser(response.data.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, nickname, password }) {
    var email = username+'@email.com'
    return api.post("/auth/signup", {
      username,
      nickname,
      email,
      password
    });
  }

  // register({ username, nickname, email, password }) {
  //   return api.post("/auth/signup", {
  //     username,
  //     nickname,
  //     email,
  //     password
  //   });
  // }
}

export default new AuthService();
