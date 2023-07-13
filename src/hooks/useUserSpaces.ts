import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Space } from "./useSpace";


interface FetchGetSpacesResponse {
  status: string;
  spaces: Space[];
}
const useUserSpaces = () => {
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

export default useUserSpaces;
