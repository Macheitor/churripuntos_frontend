import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Space } from "../hooks/useSpace";
import spaceService from "../services/space-service";

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

  const onCreateSpace = (spacename: string) => {
    spaceService
      .create({ spacename })
      .then((res) => {
        setSpaces([...spaces, res.data.space]);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setSpacesError(err.response.data.message);
      });
  };

  return { spaces, spacesError, onCreateSpace };
};

export default useUserSpaces;
