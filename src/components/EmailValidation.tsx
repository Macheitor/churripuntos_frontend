import {
  Flex,
  Box,
  Grid,
  Center,
  GridItem,
  Heading,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import userService from "../services/user-service";
import { CanceledError } from "../services/api-client";

const EmailValidation = () => {
  const toast = useToast();
  const userId = localStorage.getItem("userId") || "";
  const username = localStorage.getItem("username") || "";

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

          <Center>
            <GridItem area="main">
              <Center>
                <Heading m={5}>Check your email inbox</Heading>
              </Center>
              <Text m={5}>
                Hey <strong>{username}</strong>, <br />
                We sent an email link to complete your registration.
              </Text>
              <Center>
                <Button
                  colorScheme="blue"
                  m={5}
                  onClick={() => {
                    userService
                      .sendEmailValidation(userId)
                      .then(() => {
                        toast({
                          title: `Email sent`,
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        });
                      })
                      .catch((err) => {
                        if (err instanceof CanceledError) return;
                        toast({
                          title: err.response.data.message,
                          status: "error",
                          duration: 3000,
                          isClosable: true,
                        });
                      });
                  }}
                >
                  Resend email
                </Button>
              </Center>
            </GridItem>
          </Center>
        </Grid>
      </Box>
    </Flex>
  );
};

export default EmailValidation;
