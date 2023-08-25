import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Space, User } from "../hooks/useSpace";
import useRanking from "../hooks/useRanking";
import ModalAddUser from "./modals/ModalAddUser";
import DrawerRanking from "./drawers/DrawerRanking";
import { ChevronRightIcon } from "@chakra-ui/icons";

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

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <ModalAddUser space={space} onUserAdded={(user) => onUserAdded(user)}>
          <Button colorScheme="blue">Add user</Button>
        </ModalAddUser>
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
    </>
  );
};

export default Ranking;
