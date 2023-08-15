import apiClient from "./api-client";

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  user: {
    _id: string;
    username: string;
    accessToken: string;
  };
}

class registerService {
  register(data: RegisterRequest) {
    return apiClient.post<RegisterResponse>("/Register", data);
  }
}
export default new registerService();
