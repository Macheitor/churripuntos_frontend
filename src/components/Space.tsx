import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
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

const Space = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
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
        spaceId={space._id}
        users={space.users}
        onUpdateSpace={() => setUpdateSpace(true)}
      />
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Ranking</Tab>
          <Tab>Tasks</Tab>
          <Tab>Summary</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Ranking
              onUpdateSpace={() => setUpdateSpace(true)}
              users={space.users}
              tasksDone={space.activities}
            />
          </TabPanel>
          <TabPanel>
            <Tasks
              onUpdateSpace={() => setUpdateSpace(true)}
              tasks={space.tasks}
              users={space.users}
            />
          </TabPanel>
          <TabPanel>
            <Summary
              onUpdateSpace={() => setUpdateSpace(true)}
              tasksDone={space.activities}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Space;
