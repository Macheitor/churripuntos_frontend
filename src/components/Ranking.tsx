import { Box, Button, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { Activity, User } from "../hooks/useSpace";
import { DeleteIcon } from "@chakra-ui/icons";
import useRanking from "../hooks/useRanking";
import ModalAcceptCancel from "./ModalAcceptCancel";
import ModalAddUser from "./modals/ModalAddUser";

interface Props {
  users: User[];
  activities: Activity[];
  showDeleteIcon: boolean;
  onAddUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const Ranking = ({
  users,
  activities,
  showDeleteIcon,
  onAddUser,
  onDeleteUser,
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

          {showDeleteIcon && r.userId !== `${localStorage.getItem("userId")}` && (
            <ModalAcceptCancel
              acceptText="Delete user"
              title={`Are you sure you want to delete "${r.username}" ?`}
              onAccept={() => {
                const user: User = { username: r.username, _id: r.userId };
                onDeleteUser(user);
              }}
            >
              <DeleteIcon color="red" />
            </ModalAcceptCancel>
          )}
        </HStack>
      ))}
    </>
  );
};

export default Ranking;
