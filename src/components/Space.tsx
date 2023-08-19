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
  const {
    space,
    onUserAdded,
    onUserKicked,
    onTaskCreated,
    onTaskDeleted,
    onTaskDone,
  } = useSpace();

  const [deleteIconsSummary, setDeleteIconsSummary] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const currentUserId = `${localStorage.getItem("userId")}`;

  return (
    <Stack mr={1} ml={1} height="100vh">
      <SpaceNavBar
        spacename={space.spacename}
        spaceId={space._id}
        onDeleteTasks={() => {
          setTabIndex(1);
        }}
        onDeleteSummary={() => {
          setDeleteIconsSummary(true);
          setTabIndex(2);
        }}
      />
      <Tabs
        isLazy
        isFitted
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index);
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
              space={space}
              currentUserId={currentUserId}
              onUserAdded={(user) => onUserAdded(user)}
              onUserKicked={(user) => onUserKicked(user)}
            />
          </TabPanel>
          <TabPanel>
            <Tasks
              space={space}
              currentUserId={currentUserId}
              onTaskCreated={(task) => onTaskCreated(task)}
              onTaskDeleted={(task) => onTaskDeleted(task)}
              onTaskDone={(activity) => onTaskDone(activity)}
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
