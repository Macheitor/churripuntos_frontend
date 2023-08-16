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
import { CanceledError } from "axios";
import useUserSpaces from "../hooks/useUserSpaces";
import Form from "./Form";
import { useState } from "react";
import spaceService from "../services/space-service";

const UserSpaces = () => {
  const navigate = useNavigate();
  const { spaces, spacesError } = useUserSpaces();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [error, setError] = useState("");

  const closeModal = () => {
    onClose();
    setError("");
  };

  // Create space
  const onCreateSpace = (data: FieldValues) => {
    spaceService
      .create({ spacename: data.genericInput })
      .then(() => {
        closeModal();
        window.location.reload(); // TODO: Find a way to reload only this component
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.response.data.message);
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      alignItems="center"
    >
      <Box minW={{ base: "90%", md: "750px" }}>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
          }}
        >
          <GridItem area="nav">
            <NavBar />
          </GridItem>

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
                {spaces.map((space) => (
                  <Card borderRadius={10} overflow="hidden" key={space._id}>
                    <CardBody
                      onClick={() => {
                        localStorage.setItem("currentSpaceId", space._id);
                        navigate(`/spaces/${space._id}`);
                      }}
                    >
                      <Heading fontSize="2xl">{space.spacename}</Heading>
                    </CardBody>
                  </Card>
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
                  onCreateSpace(data);
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