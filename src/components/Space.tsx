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
    onTaskDoneDeleted
  } = useSpace();


  const [tabIndex, setTabIndex] = useState(0);
  const currentUserId = `${localStorage.getItem("userId")}`;

  return (
    <Stack mr={1} ml={1} height="100vh">
      <SpaceNavBar
        space={space}
      />
      <Tabs
        isLazy
        isFitted
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index);
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
              space={space}
              onTaskDoneDeleted={(taskDone) => onTaskDoneDeleted(taskDone)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Space;
