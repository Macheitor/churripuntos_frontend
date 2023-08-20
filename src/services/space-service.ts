import { Activity, Space, Task, User } from "../hooks/useSpace";
import apiClient from "./api-client";

class spaceService {
  create(newSpacename: string) {
    return apiClient.post(`/spaces/`, newSpacename);
  }

  delete(spaceId: string) {
    return apiClient.delete(`/spaces/${spaceId}`);
  }

  changeSpacename(space: Space, newSpacename: string) {
    return apiClient.put(`/spaces/${space._id}/`, {newSpacename});
  }

  addUser(space: Space, user: User) {
    return apiClient.put(`/spaces/${space._id}/users`, user);
  }

  removeUser(space: Space, user: User) {
    return apiClient.delete(`/spaces/${space._id}/users/${user._id}`);
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
}
export default new spaceService();
