import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

import ColorModeSwitch from "./ColorModeSwitch";
import UserMenu from "./UserMenu";

const NavBar = () => {
  return (
    <HStack justify={"space-between"} padding={2}>
      <Image src={logo} boxSize="60px" />
      <Text>Churripuntos</Text>
      <HStack>
        <ColorModeSwitch />
        <UserMenu></UserMenu>
      </HStack>
    </HStack>
  );
};

export default NavBar;
