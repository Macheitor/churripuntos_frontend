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

interface Space {
  spacename: string;
  tasks: Task[];
  users: User[];
  _id: string;
}

interface FetchGetSpacesResponse {
  status: string;
  spaces: Space[];
}
const useSpaces = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchGetSpacesResponse>(`/users/${localStorage.getItem("userId")}`, {
        signal: controller.signal,
      })
      .then((res) => setSpaces(res.data.spaces))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  return { spaces, error };
};

export default useSpaces;
