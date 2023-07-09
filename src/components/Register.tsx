import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";

const Register = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <Center>
        <GridItem area="main" width={700}>
          <Text>Register</Text>
        </GridItem>
      </Center>
    </Grid>
  );
};

export default Register;
