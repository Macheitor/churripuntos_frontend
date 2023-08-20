import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Space } from "../hooks/useSpace";

interface FetchGetSpacesResponse {
  status: string;
  spaces: Space[];
}

const useUserSpaces = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);

  const [spacesError, setSpacesError] = useState("");

  useEffect(() => {
    console.log("getting spaces");

    const controller = new AbortController();

    apiClient
      .get<FetchGetSpacesResponse>(`/users/${localStorage.getItem("userId")}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setSpaces(res.data.spaces);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setSpacesError("Error getting spaces: " + err.response.data.code);
      });
    return () => controller.abort();
  }, []);

  const onSpaceCreated = (space: Space) => {
    setSpaces([...spaces, space])
  }

  return { spaces, spacesError, onSpaceCreated };
};

export default useUserSpaces;
