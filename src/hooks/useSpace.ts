import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient, { CanceledError } from "../services/api-client";

export interface User {
  isAdmin?: boolean;
  username: string;
  _id: string;
}

export interface Task {
  taskname: string;
  points: number;
  _id: string;
}
// TODO: Activity should have a User document, instead of username and userId separately
export interface Activity {
  username: string;
  userId: string;
  color: string;
  taskId: string;
  taskname: string;
  points: number;
  date: string;
  validated: boolean;
  _id: string;
}

export interface Space {
  spacename: string;
  users: User[];
  tasks: Task[];
  activities: Activity[];
  _id: string;
}

interface FetchGetSpaceResponse {
  status: string;
  space: Space;
}

const useSpace = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState<Space>({
    spacename: "",
    users: [],
    tasks: [],
    activities: [],
    _id: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    apiClient
      .get<FetchGetSpaceResponse>(`/spaces/${spaceId}`, { signal })
      .then((res) => {
        setSpace(res.data.space);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });

    return () => controller.abort();
  }, []);

  const onAddUser = (user: User) => {
    apiClient
      .put(`/spaces/${localStorage.getItem("currentSpaceId")}/users`, user)
      .then(() => {
        setSpace({ ...space, users: [...space.users, user] });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  const onKickOutUser = (user: User) => {
    apiClient
      .delete(`/spaces/${spaceId}/users/${user._id}`)
      .then(() => {
        setSpace({
          ...space,
          users: space.users.filter((u) => u._id !== user._id),
        });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  const onCreateTask = (task: Task) => {
    apiClient
      .post(`/spaces/${spaceId}/tasks`, task)
      .then((res) => {
        setSpace({ ...space, tasks: [...space.tasks, res.data.task] });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  return { space, onAddUser, onKickOutUser, onCreateTask };
};

export default useSpace;
