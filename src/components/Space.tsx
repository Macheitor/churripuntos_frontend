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

import useSpace, { User } from "../hooks/useSpace";
import { useNavigate } from "react-router-dom";

const Space = () => {
  const navigate = useNavigate();
  
  const {
    space,
    onSpacenameChanged,
    onUserAdded,
    onUserKicked,
    onTaskCreated,
    onTaskDeleted,
    onTaskDone,
    onTaskDoneDeleted
  } = useSpace();


  const [tabIndex, setTabIndex] = useState(0);
  const currentUser: User = {username:`${localStorage.getItem("username")}`, _id:`${localStorage.getItem("userId")}`, isDeleted:false} 

  if (space.users.find(user => user._id === currentUser._id)?.isDeleted) navigate("/spaces");


  return (
    <Stack mr={1} ml={1} height="100vh">
      <SpaceNavBar
        space={space}
        currentUser={currentUser}
        onSpacenameChanged={(newSpacename) => onSpacenameChanged(newSpacename)}
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
              currentUser={currentUser}
              onUserAdded={(user) => onUserAdded(user)}
              onUserKicked={(user) => onUserKicked(user)}
            />
          </TabPanel>
          <TabPanel>
            <Tasks
              space={space}
              currentUser={currentUser}
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
