import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SpaceNavBar from "./SpaceNavBar";
import { useEffect, useState } from "react";
import Ranking from "./Ranking";
import Tasks from "./Tasks";
import Summary from "./Summary";
import useSpace from "../hooks/useSpace";
import { useNavigate } from "react-router-dom";

const Space = () => {
  const navigate = useNavigate();

  const {
    space,
    onUsernameChanged,
    onSpacenameChanged,
    onUserAdded,
    onUserRemoved,
    onTaskCreated,
    onTaskDeleted,
    onTaskDone,
    onTaskDoneDeleted,
    onAdminUpgraded,
    onAdminDowngraded,
  } = useSpace();

  const [tabIndex, setTabIndex] = useState(
    parseInt(localStorage.getItem("currentTab") || "0")
  );
  const currentUserId = localStorage.getItem("userId") || "";

  useEffect(() => {
    if (
      !currentUserId ||
      space.users.find((user) => user._id === currentUserId)?.isDeleted
    )
      return navigate("/spaces");
  }, []);

  return (
    <Stack mr={1} ml={1} height="100vh">
      <SpaceNavBar
        space={space}
        currentUserId={currentUserId}
        onUsernameChanged={(userId, newUsername) =>
          onUsernameChanged(userId, newUsername)
        }
        onSpacenameChanged={(newSpacename) => onSpacenameChanged(newSpacename)}
      />
      <Tabs
        isLazy
        isFitted
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index);
          localStorage.setItem("currentTab", index.toString())
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
              onUserRemoved={(user) => onUserRemoved(user)}
              onAdminUpgraded={(user) => onAdminUpgraded(user)}
              onAdminDowngraded={(user) => onAdminDowngraded(user)}
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
