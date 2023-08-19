import { Space, User } from "../hooks/useSpace";
import apiClient from "./api-client";

interface CreateSpaceRequest {
  spacename: string;
}

class spaceService {
  create(newSpacename: CreateSpaceRequest) {
    return apiClient.post(`/spaces/`, newSpacename);
  }

  delete(spaceId: string) {
    return apiClient.delete(`/spaces/${spaceId}`);
  }

  addUser(space: Space, user: User) {
    return apiClient.put(`/spaces/${space._id}/users`, user);
  }

  removeUser(space: Space, user: User) {
    return apiClient.delete(`/spaces/${space._id}/users/${user._id}`);
  }
}
export default new spaceService();
