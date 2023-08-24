import { Activity, Space, Task, User } from "../hooks/useSpace";
import apiClient from "./api-client";

class spaceService {
  create(spacename: string) {
    return apiClient.post(`/spaces/`, { spacename });
  }

  delete(spaceId: string) {
    return apiClient.delete(`/spaces/${spaceId}`);
  }

  changeSpacename(space: Space, newSpacename: string) {
    return apiClient.put(`/spaces/${space._id}/`, { newSpacename });
  }

  addUser(space: Space, email: string) {
    return apiClient.put(`/spaces/${space._id}/users`, {email});
  }

  removeUser(space: Space, userId: string) {
    return apiClient.delete(`/spaces/${space._id}/users/${userId}`);
  }

  createTask(space: Space, task: Task) {
    return apiClient.post(`/spaces/${space._id}/tasks`, task);
  }

  deleteTask(space: Space, task: Task) {
    return apiClient.delete(`/spaces/${space._id}/tasks/${task._id}`);
  }

  taskDone(space: Space, task: Task, user: User) {
    return apiClient.post(`/spaces/${space._id}/activities`, { task, user });
  }

  deleteTaskDone(space: Space, taskDone: Activity) {
    return apiClient.delete(`/spaces/${space._id}/activities/${taskDone._id}`);
  }

  makeAdmin(space: Space, userId: string) {
    return apiClient.post(`/spaces/${space._id}/admins`,{userId});
  }

  removeAdmin(space: Space, userId: string) {
    return apiClient.delete(`/spaces/${space._id}/admins/${userId}`);
  }
}
export default new spaceService();
