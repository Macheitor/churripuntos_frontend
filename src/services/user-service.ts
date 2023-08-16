import { Space } from "../components/Space";
import apiClient from "./api-client";

interface FetchGetUserSpacesResponse {
  status: string;
  spaces: Space[];
}

/*
  getAllUsers() {
    const controller = new AbortController();

    const request = apiClient.get(`/users`),
      {
        signal: controller.signal,
      }
    );

    return { request, cancel: () => controller.abort() };

};
  }

*/

class userService {
  getAllUsers() {
    const controller = new AbortController();
    const signal = controller.signal;
    const cancel = () => controller.abort();

    const request = apiClient.get(`/users`, { signal });

    return { request, cancel };
  }

  getSpaces() {
    const controller = new AbortController();
    const signal = controller.signal;
    const cancel = () => controller.abort();

    const request = apiClient.get<FetchGetUserSpacesResponse>(
      `/users/${localStorage.getItem("userId")}`,
      {
        signal,
      }
    );

    return { request, cancel };
  }
}
export default new userService();
