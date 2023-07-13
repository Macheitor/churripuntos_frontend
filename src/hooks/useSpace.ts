import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface User {
  isAdmin: boolean;
  username: string;
  color: string;
  _id: string;
}

interface Task {
  taskname: string;
  points: number;
  _id: string;
}

export interface Activity {
  username: string;
  userId: string;
  color: string;
  taskId: string;
  taskname: string;
  points: number;
  date: string;
  validated: boolean;
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
const useSpace = (spaceId: string) => {
  const [space, setSpaces] = useState<Space>({
    spacename: "",
    tasks: [],
    users: [],
    activities: [],
    _id: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchGetSpaceResponse>(`/spaces/${spaceId}`, {
        signal: controller.signal,
      })
      .then((res) => setSpaces(res.data.space))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { space, error };
};

export default useSpace;
