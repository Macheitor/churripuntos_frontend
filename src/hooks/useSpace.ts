import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Task {
  taskname: string;
  points: number;
  _id: string;
}

interface User {
  isAdmin: boolean;
  username: string;
  color: string;
  _id: string;
}

export interface Space {
  spacename: string;
  tasks: Task[];
  users: User[];
  _id: string;
}

interface FetchGetSpaceResponse {
  status: string;
  space: Space;
}
const useSpace = (spaceId: string) => {
  const [space, setSpaces] = useState<Space>({spacename: "", tasks: [], users: [], _id: ""});
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
