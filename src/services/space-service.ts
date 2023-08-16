import apiClient from "./api-client";

export interface CreateSpaceRequest {
  spacename: string;
}

class spaceService {
  create(newSpacename: CreateSpaceRequest) {
    return apiClient.post(`/spaces/`, newSpacename)
  }
}
export default new spaceService();