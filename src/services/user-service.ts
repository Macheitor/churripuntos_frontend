import { Space } from "../components/Space";
import apiClient from "./api-client";

interface FetchGetUserSpacesResponse {
  status: string;
  spaces: Space[];
}

class userService {
  getSpaces() {
    const controller = new AbortController();

    const request = apiClient.get<FetchGetUserSpacesResponse>(
      `/users/${localStorage.getItem("userId")}`,
      {
        signal: controller.signal,
      }
    );

    return { request, cancel: () => controller.abort() };
  }
}
export default new userService();
