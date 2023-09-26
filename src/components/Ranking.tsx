import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Space, User } from "../hooks/useSpace";
import useRanking from "../hooks/useRanking";
import DrawerRanking from "./drawers/DrawerRanking";
import { ChevronRightIcon } from "@chakra-ui/icons";
import GenericModal from "./modals/GenericModal";
import { FieldValues } from "react-hook-form";
import spaceService from "../services/space-service";
import { CanceledError } from "../services/api-client";
import Chart from "./Chart";
import { useState } from "react";

interface Props {
  space: Space;
  currentUserId: string;
  onUserAdded: (user: User) => void;
  onUserRemoved: (user: User) => void;
  onAdminUpgraded: (user: User) => void;
  onAdminDowngraded: (user: User) => void;
}

const Ranking = ({
  space,
  currentUserId,
  onUserAdded,
  onUserRemoved,
  onAdminUpgraded,
  onAdminDowngraded,
}: Props) => {
  const users = space.users;
  const activities = space.activities;
  const { ranking } = useRanking(users, activities);
  const [cumulative, setCumulative] = useState(true)
  const toast = useToast();

  const addUser = (data: FieldValues) => {
    spaceService
      .addUser(space, data.email)
      .then((res) => {
        onUserAdded(res.data.user);
        toast({
          title: `user ${res.data.user.username} added to "${space.spacename}".`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <GenericModal
          title="Add User"
          emailForm
          dismissBtn="Cancel"
          actionBtn="Add user"
          onAction={(data?: FieldValues) => {
            data && addUser(data);
          }}
        >
          <Button colorScheme="blue">Add user</Button>
        </GenericModal>
      </HStack>

      {ranking.map((rank, index) => (
        <HStack key={rank._id} p={1}>
          <Box w="100%" bg={"gray.700"} borderRadius={10}>
            <DrawerRanking
              space={space}
              userSelected={rank}
              currentUserId={currentUserId}
              onAdminUpgraded={() => onAdminUpgraded(rank)}
              onAdminDowngraded={() => onAdminDowngraded(rank)}
              onUserRemoved={() => onUserRemoved(rank)}
            >
              <HStack justify={"space-between"} ml={2} mr={2}>
                <HStack>
                  <Heading fontSize="2xl">{index + 1}</Heading>
                  <Text>{rank.username}</Text>

                  {rank.isAdmin && (
                    <Badge colorScheme="green" fontSize={8}>
                      ADMIN
                    </Badge>
                  )}
                </HStack>
                <HStack>
                  <Text>{rank.points} points</Text>
                  <ChevronRightIcon boxSize={7} />
                </HStack>
              </HStack>
            </DrawerRanking>
          </Box>
        </HStack>
      ))}
      <Switch colorScheme="blue"  onChange={() => setCumulative(!cumulative)} />
      <Chart space={space} cumulative={cumulative}/>
    </>
  );
};

export default Ranking;
