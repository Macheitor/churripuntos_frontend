import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import useLocalStorage from "../hooks/useLocalStorage";

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
  // activities: todo[],
  spacename: string;
  tasks: Task[];
  users: User[];
  _id: string;
}

interface FetchGetSpacesResponse {
  status: string;
  spaces: Space[];
}

const SpacesGrid = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGetSpacesResponse>(`/users/${localStorage.getItem("userId")}`)
      .then((res) => setSpaces(res.data.spaces))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {spaces.map((space) => (
          <li key={space._id}>{space.spacename}</li>
        ))}
      </ul>
    </>
  );
};

export default SpacesGrid;
