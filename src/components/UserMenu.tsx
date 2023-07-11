import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  const logout = () => {
    console.log("delete");
    localStorage.clear();
    navigate("/login");
  };

  const getSpaces = () => {
    console.log("get spaces");
    apiClient
      .get(`/users/${localStorage.getItem("userId")}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      {/* <Icon as={AiOutlineUser} boxSize={6}></Icon> */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem onClick={logout}>Logout</MenuItem>
          <MenuItem onClick={getSpaces}>Get Spaces</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
