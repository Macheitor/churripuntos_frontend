import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import ModalAcceptCancel from "./ModalAcceptCancel";
import ModalSelectAcceptCancel from "./ModalSelectAcceptCancel";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { User } from "./Space";

interface Props {
  users: User[];
  onDeleteUser: (userId: string) => void;
  onDeleteSpace: () => void;
}

const SpaceNavBarMenu = ({ users, onDeleteUser, onDeleteSpace }: Props) => {
  const userList = users.map(({ _id, username }) => ({
    id: _id,
    text: username,
  }));

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <ModalAcceptCancel
          acceptText="Delete space"
          title="Are you sure you want to delete this space?"
          onAccept={onDeleteSpace}
        >
          <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
        </ModalAcceptCancel>
        <ModalSelectAcceptCancel
          selectOptions={userList}
          acceptText="Delete user"
          title="Select user to delete"
          onAccept={(userId) => onDeleteUser(userId)}
        >
          <MenuItem icon={<DeleteIcon />}>Delete user</MenuItem>
        </ModalSelectAcceptCancel>
      </MenuList>
    </Menu>
  );
};

export default SpaceNavBarMenu;
