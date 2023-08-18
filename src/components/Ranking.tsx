import { Box, Button, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { Activity, User } from "../hooks/useSpace";
import { DeleteIcon } from "@chakra-ui/icons";
import useRanking from "../hooks/useRanking";
import ModalAddUser from "./modals/ModalAddUser";
import ModalKickOutUser from "./modals/ModalKickOutUser";

interface Props {
  users: User[];
  activities: Activity[];
  showDeleteIcon: boolean;
  onAddUser: (user: User) => void;
  onKickOutUser: (user: User) => void;
}

const Ranking = ({
  users,
  activities,
  showDeleteIcon,
  onAddUser,
  onKickOutUser,
}: Props) => {
  const { ranking } = useRanking(users, activities);

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <ModalAddUser onAccept={(user) => onAddUser(user)}>
          <Button colorScheme="blue">Add user</Button>
        </ModalAddUser>
      </HStack>

      {ranking.map((r, index) => (
        <HStack key={r.userId} p={1}>
          <Box w="100%" bg={"gray.700"} borderRadius={10}>
            <HStack justify={"space-between"} ml={2} mr={2}>
              <Heading fontSize="2xl">{index + 1}</Heading>
              <Text>{r.username}</Text>
              <Text>{r.points} points</Text>
            </HStack>
          </Box>

          {showDeleteIcon &&
            r.userId !== `${localStorage.getItem("userId")}` && (
              <ModalKickOutUser
                username={r.username}
                onAccept={() => {
                  const user: User = { username: r.username, _id: r.userId };
                  onKickOutUser(user);
                }}
              >
                <DeleteIcon color="red" />
              </ModalKickOutUser>
            )}
        </HStack>
      ))}
    </>
  );
};

export default Ranking;
