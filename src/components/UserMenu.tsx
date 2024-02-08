import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const UserMenu = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getSpaces = () => {
    apiClient
      .get(`/users/${localStorage.getItem("userId")}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon as={AiOutlineUser} boxSize={6}></Icon>}
          variant="outline"
          borderRadius={20}
        />
        <MenuList>
          {/* <MenuItem onClick={getSpaces}>Get Spaces</MenuItem> */}
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
