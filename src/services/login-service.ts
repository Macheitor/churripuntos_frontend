import apiClient from "./api-client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  user: {
    _id: string;
    username: string;
    accessToken: string;
  };
}

// class LoginService {
//   login(data: LoginRequest) {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const request = apiClient.post<LoginResponse>("/login", data);

//     return { request, cancel: () => controller.abort() };
//   }
// }

class LoginService {
  login(data: LoginRequest) {
    return apiClient.post<LoginResponse>("/login", data);
  }
}
export default new LoginService();
