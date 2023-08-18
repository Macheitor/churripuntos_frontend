import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SpaceNavBar from "./SpaceNavBar";
import { useState } from "react";
import Ranking from "./Ranking";
import Tasks from "./Tasks";
import Summary from "./Summary";

import useSpace from "../hooks/useSpace";

const Space = () => {
  const { space, errorSpace, setErrorSpace, onAddUser, onKickOutUser } =
    useSpace();

  const [deleteIconsRanking, setDeleteIconsRanking] = useState(false);
  const [deleteIconsTasks, setDeleteIconsTasks] = useState(false);
  const [deleteIconsSummary, setDeleteIconsSummary] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

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
              onAddUser={(user) => onAddUser(user)}
              onKickOutUser={(user) => onKickOutUser(user)}
              users={space.users}
              activities={space.activities}
              showDeleteIcon={deleteIconsRanking}
            />
          </TabPanel>
          <TabPanel>
            <Tasks
              users={space.users}
              tasks={space.tasks}
              deleteIcons={deleteIconsTasks}
            />
          </TabPanel>
          <TabPanel>
            <Summary
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
