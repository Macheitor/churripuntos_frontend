import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import useUserSpaces from "../hooks/useUserSpaces";
import Form from "./Form";
import { useState } from "react";
import { Space } from "../hooks/useSpace";

const UserSpaces = () => {
  // Hook for navigate between pages
  const navigate = useNavigate();

  // Custom hook for getting al user spaces
  const { spaces, spacesError, onCreateSpace } = useUserSpaces();

  // chakra-ui hook for controlling the modal
  const { onOpen, onClose, isOpen } = useDisclosure();

  // useState for displaying error
  const [error, setError] = useState("");

  // Function to call whenever the modal is closed
  const closeModal = () => {
    onClose();
    setError("");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      alignItems="center"
    >
      {/* Box to fix the size of the view */}
      <Box minW={{ base: "90%", md: "750px" }}>
        {/* Grid of the user spaces */}
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
          }}
        >
          {/* Navbar item */}
          <GridItem area="nav">
            <NavBar />
          </GridItem>

          {/* Button for creating spaces */}
          <HStack justify={"right"} mr={2}>
            <Button
              colorScheme="blue"
              onClick={() => {
                onOpen();
              }}
            >
              Create space
            </Button>
          </HStack>

          <Center>
            <GridItem area="main">
              {spacesError && <Text>{spacesError}</Text>}
              <SimpleGrid padding="10px" spacing={10}>
                {spaces.map((space: Space) => (
                  <Button
                    bg={"gray.700"}
                    borderRadius={10}
                    fontSize="2xl"
                    key={space._id}
                    onClick={() => {
                      localStorage.setItem("currentSpaceId", space._id);
                      navigate(`/spaces/${space._id}`);
                    }}
                  >
                    {space.spacename}
                  </Button>
                ))}
              </SimpleGrid>
            </GridItem>
          </Center>
        </Grid>

        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
          <ModalOverlay />
          <ModalContent>
            <Stack spacing={4} p={1}>
              <Form
                title="Create new space"
                acceptText="Create space"
                cancelBtn={true}
                cancelText="Cancel"
                genericInput={true}
                genericInputPlaceHolder="Spacename"
                errorMsg={error}
                onAccept={(data: FieldValues) => {
                  closeModal();
                  onCreateSpace(data.genericInput);
                }}
                onCancel={closeModal}
              />
            </Stack>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default UserSpaces;
