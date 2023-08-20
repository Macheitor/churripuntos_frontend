import {
  HStack,
  Heading,
  Stack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Space } from "../hooks/useSpace";
import ModalChangeSpacename from "./modals/ModalChangeSpacename";
import ModalDeleteSpace from "./modals/ModalDeleteSpace";

interface Props {
  space: Space;
  onSpacenameChanged: (newSpacename: string) => void;
}
const SpaceNavBar = ({ space, onSpacenameChanged }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack>
        <HStack justify={"space-between"} padding={3}>
          <ChevronLeftIcon boxSize={10} onClick={() => navigate(-1)} />
          <Heading fontSize="xl">{space.spacename}</Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <ModalChangeSpacename
                space={space}
                onSpacenameChanged={(newSpacename) =>
                  onSpacenameChanged(newSpacename)
                }
              >
                <MenuItem icon={<DeleteIcon />}>Change spacename</MenuItem>
              </ModalChangeSpacename>
              <ModalDeleteSpace space={space}>
                <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
              </ModalDeleteSpace>
            </MenuList>
          </Menu>
        </HStack>
      </Stack>
    </>
  );
};

export default SpaceNavBar;
