import {
  Box,
  MenuItem,
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
import { DeleteIcon } from "@chakra-ui/icons";
import ModalAcceptCancel from "./ModalAcceptCancel";

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

  const [deleteIconsRanking, setDeleteIconsRanking] = useState(false);
  const [deleteIconsTasks, setDeleteIconsTasks] = useState(false);
  const [deleteIconsSummary, setDeleteIconsSummary] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

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

  const handleDeleteSpace = () => {
    apiClient
      .delete(`/spaces/${spaceId}`)
      .then(() => {
        navigate("/spaces");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        console.log(err.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <Stack margin={2}>
      <SpaceNavBar
        spacename={space.spacename}
        spaceId={space._id}
        onDeleteRanking={() => {
          setDeleteIconsRanking(true);
          setTabIndex(0);
        }}
        onDeleteTasks={() => {
          setDeleteIconsTasks(true);
          setTabIndex(1);
        }}
        onDeleteSummary={() => {
          setDeleteIconsSummary(true);
          setTabIndex(2);
        }}
        onDeleteSpace={() => {
          <ModalAcceptCancel
            acceptText="Delete space"
            title="Are you sure you want to delete this space?"
            onAccept={handleDeleteSpace}
          >
            <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
          </ModalAcceptCancel>;
        }}
        onUpdateSpace={() => setUpdateSpace(true)}
      />

      <Tabs
        isFitted
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index);
          setDeleteIconsRanking(false);
          setDeleteIconsTasks(false);
          setDeleteIconsSummary(false);
        }}
        variant="enclosed"
      >
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
              deleteIcons={deleteIconsRanking}
            />
          </TabPanel>
          <TabPanel>
            <Tasks
              onUpdateSpace={() => setUpdateSpace(true)}
              users={space.users}
              tasks={space.tasks}
              deleteIcons={deleteIconsTasks}
            />
          </TabPanel>
          <TabPanel>
            <Summary
              onUpdateSpace={() => setUpdateSpace(true)}
              tasksDone={space.activities}
              deleteIcons={deleteIconsSummary}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Space;
