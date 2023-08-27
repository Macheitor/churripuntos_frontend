import {
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";

const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
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
    <HStack justify={"space-between"} padding={2}>
      <Image src={logo} boxSize="60px" />
      <Text>Churripuntos</Text>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon as={AiOutlineUser} boxSize={6}></Icon>}
          variant="outline"
          borderRadius={20}
        />
        <MenuList>
          <MenuItem onClick={getSpaces}>Get Spaces</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default NavBar;
