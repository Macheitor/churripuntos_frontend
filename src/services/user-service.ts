import { Space } from "./../hooks/useSpace";
import apiClient from "./api-client";
import spaceService from "./space-service";

interface FetchGetUserSpacesResponse {
  status: string;
  spaces: Space[];
}

class userService {
  getUser(userId: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const cancel = () => controller.abort();

    const request = apiClient.get(`/users/${userId}`, { signal });

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

  validateEmail(userId: string, emailValidationToken: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const cancel = () => controller.abort();
    console.log("here")
    const request = apiClient.get(
      `/emails/${userId}/token/${emailValidationToken}`,
      { signal }
    );

    return { request, cancel };
  }

  // TODO: rewrite this as above
  sendEmailValidation(userId: string) {
    return apiClient.get(`/users/${userId}/sendValidationEmail`);
  }
}
export default new userService();
