import apiClient from "./api-client";

interface CreateSpaceRequest {
  spacename: string;
}

class spaceService {
  create(newSpacename: CreateSpaceRequest) {
    return apiClient.post(`/spaces/`, newSpacename)
  }
  delete(spaceId: string) {
    return apiClient.delete(`/spaces/${spaceId}`)
  }
}
export default new spaceService();