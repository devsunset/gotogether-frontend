import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        // 401 or 접근이 거부되었습니다 -> 원칙은 401만 체크하는게 맞으나 Role체크 로직이 있기 때문에 "접근 권한이 없습니다. " 값도 함께 체크
        if (
          (err.response.status === 401 ||
            err.response.data.description == "접근이 거부되었습니다.") &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;

          try {
            if (TokenService.getLocalRefreshToken() === undefined) {
              //alert("로그인 정보가 유효하지 않습니다.");
              store.dispatch("auth/logout");
              TokenService.removeUser();
              return;
            }
            const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { token } = rs.data.data;

            store.dispatch("auth/refreshToken", token);
            TokenService.updateLocalToken(token);

            return axiosInstance(originalConfig);
          } catch (_error) {
            if (_error.message == "Request failed with status code 403") {
              //alert("로그인 정보가 만료되었습니다 다시 로그인해 주세요.");
              store.dispatch("auth/logout");
              TokenService.removeUser();
            }
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
