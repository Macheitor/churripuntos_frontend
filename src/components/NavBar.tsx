import { Button, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

import ColorModeSwitch from "./ColorModeSwitch";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <HStack justify={"space-between"} padding={2}>
      <HStack>
        <Image src={logo} boxSize="60px" onClick={() => navigate("/")}/>
        <Text>Churripuntos</Text>
      </HStack>
      <HStack>
        <Button colorScheme="blue" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/register")}>
          Register
        </Button>
        <ColorModeSwitch />
        <UserMenu></UserMenu>
      </HStack>
    </HStack>
  );
};

export default NavBar;
