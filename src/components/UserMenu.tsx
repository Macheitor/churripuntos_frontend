import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import apiClient from "../services/api-client";

const UserMenu = () => {
  const loginTest = () => {
    console.log("login");
    apiClient
      .post("/login", {
        username: "test",
        password: "test",
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("accessToken", res.data.user.accessToken);
      })
      .catch((err) => console.log(err.response.data));
  };

  const registerTest = () => {
    console.log("register");
    apiClient
      .post("/register", {
        username: "test",
        password: "test",
        email: "test@test.com",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };
  const deleteStorage = () => {
    console.log("delete");
    localStorage.clear();
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
          <MenuItem onClick={loginTest}>Login test</MenuItem>
          <MenuItem onClick={registerTest}>Register tets</MenuItem>
          <MenuItem onClick={deleteStorage}>Delete storage</MenuItem>
          <MenuItem onClick={getSpaces}>Get Spaces</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
