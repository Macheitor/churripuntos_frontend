import { Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import SpaceNavBar from "./SpaceNavBar";
import { useEffect, useState } from "react";
import Ranking from "./Ranking";
import Tasks from "./Tasks";
import Summary from "./Summary";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface User {
  isAdmin: boolean;
  username: string;
  color: string;
  _id: string;
}

export interface Task {
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
  _id: string
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

const Space = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const [section, setSection] = useState("Ranking");
  const [updateSpace, setUpdateSpace] = useState(true);
  const [space, setSpace] = useState<Space>({
    spacename: "",
    tasks: [],
    users: [],
    activities: [],
    _id: "",
  });
  const [error, setError] = useState("");

  const currentSpaceId = localStorage.getItem("currentSpaceId");

  useEffect(() => {
    if ((spaceId && spaceId !== currentSpaceId) || currentSpaceId === null) {
      return navigate("/spaces", { replace: true });
    }

    if (updateSpace) {
      const controller = new AbortController();
      const signal = controller.signal;
      apiClient
        .get<FetchGetSpaceResponse>(`/spaces/${currentSpaceId}`, { signal })
        .then((res) => {
          setSpace(res.data.space);
          setUpdateSpace(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.response.data.message);
          setUpdateSpace(false);
        });

      return () => controller.abort();
    }
  }, [spaceId, updateSpace]); // TODO: is spaceId needed here?

  return (
    <Stack margin={2}>
      <SpaceNavBar
        spacename={space.spacename}
        onClick={(section) => setSection(section)}
      />

      {section === "Ranking" && <Ranking tasksDone={space.activities}/>}
      {section === "Tasks" && (
        <Tasks
          onUpdateSpace={() => setUpdateSpace(true)}
          tasks={space.tasks}
          users={space.users}
        />
      )}
      {section === "Summary" && <Summary tasksDone={space.activities} />}
    </Stack>
  );
};

export default Space;
