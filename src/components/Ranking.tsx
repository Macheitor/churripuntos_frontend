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
import { DeleteIcon } from "@chakra-ui/icons";
import useRanking from "../hooks/useRanking";
import ModalAddUser from "./modals/ModalAddUser";
import ModalKickOutUser from "./modals/ModalKickOutUser";
import { useState } from "react";
import spaceService from "../services/space-service";
import { CanceledError } from "../services/api-client";

interface Props {
  space: Space;
  currentUserId: string;
  onUserAdded: (user: User) => void;
  onUserKicked: (user: User) => void;
  onAdminUpgraded: (user: User) => void;
  onAdminDowngraded: (user: User) => void;
}

const Ranking = ({
  space,
  currentUserId,
  onUserAdded,
  onUserKicked,
  onAdminUpgraded,
  onAdminDowngraded
}: Props) => {
  const users = space.users;
  const activities = space.activities;

  const { ranking } = useRanking(users, activities);
  const [removeBtn, setRemoveBtn] = useState("Remove");
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [editAdmin, setEditAdmin] = useState("Edit admins");
  const [showAdminsIcon, setShowAdminsIcon] = useState(false);

  const IsCurrentUserAdmin = space.users.find(
    (u) => u._id === currentUserId && u.isAdmin
  );

  const toggleRemoveBtn = () => {
    if (removeBtn === "Remove") {
      setShowDeleteIcon(true);
      setRemoveBtn("Cancel");
    } else {
      setShowDeleteIcon(false);
      setRemoveBtn("Remove");
    }
  };

  const toggleEditAdminsBtn = () => {
    if (editAdmin === "Edit admins") {
      setShowAdminsIcon(true);
      setEditAdmin("Cancel");
    } else {
      setShowAdminsIcon(false);
      setEditAdmin("Edit admins");
    }
  };

  const makeAdmin = (user: User) => {
    spaceService
      .makeAdmin(space, user._id)
      .then(() => {
        onAdminUpgraded(user)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  const removeAdmin = (user: User) => {
    spaceService
      .removeAdmin(space, user._id)
      .then(() => {
        onAdminDowngraded(user)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      {ranking.map((rank, index) => (
        <HStack key={rank._id} p={1}>
          <Box w="100%" bg={"gray.700"} borderRadius={10}>
            <HStack justify={"space-between"} ml={2} mr={2}>
              <Heading fontSize="2xl">{index + 1}</Heading>
              <HStack>
                <Text>{rank.username}</Text>

                {rank.isAdmin && <Badge>ADMIN</Badge>}

                {showAdminsIcon && rank.isAdmin && (
                  <Badge
                    color={"red"}
                    onClick={() => {
                      removeAdmin(rank);
                    }}
                  >
                    Remove as admin
                  </Badge>
                )}
                {showAdminsIcon && !rank.isAdmin && (
                  <Badge
                    color={"green"}
                    onClick={() => {
                      makeAdmin(rank);
                    }}
                  >
                    Add as admin
                  </Badge>
                )}
              </HStack>
              <Text>{rank.points} points</Text>
            </HStack>
          </Box>

          {showDeleteIcon && rank._id !== currentUserId && (
            <ModalKickOutUser
              space={space}
              user={rank}
              onUserKicked={() => {
                onUserKicked(rank);
                if (ranking.length === 2) toggleRemoveBtn();
              }}
            >
              <DeleteIcon color="red" />
            </ModalKickOutUser>
          )}
        </HStack>
      ))}

      <HStack justify={"right"} p={1}>
        {IsCurrentUserAdmin && (
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => {
              toggleEditAdminsBtn()

              setShowDeleteIcon(false);
              setRemoveBtn("Remove");
              
            }}
          >
            {editAdmin}
          </Button>
        )}
        <ModalAddUser space={space} onUserAdded={(user) => onUserAdded(user)}>
          <Button
            colorScheme="blue"
            onClick={() => {
              // Force removeBtn to Remove
              setShowDeleteIcon(false);
              setRemoveBtn("Remove");

              setShowAdminsIcon(false);
              setEditAdmin("Edit admins");
            }}
          >
            Add user
          </Button>
        </ModalAddUser>

        {ranking.length > 1 && (
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => {
              toggleRemoveBtn();
              setShowAdminsIcon(false);

              setShowAdminsIcon(false);
              setEditAdmin("Edit admins");
            }}
          >
            {removeBtn}
          </Button>
        )}
      </HStack>
    </>
  );
};

export default Ranking;
