import { Space } from "./../hooks/useSpace";
import apiClient from "./api-client";
import spaceService from "./space-service";

interface FetchGetUserSpacesResponse {
  status: string;
  spaces: Space[];
}

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

  changeUsername(userId: string, newUsername: string) {
    return apiClient.put(`/users/${userId}/`, { newUsername });
  }
}
export default new userService();
