import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import SpaceNavBar from "./SpaceNavBar";
import useSpace from "../hooks/useSpace";
import { useEffect } from "react";

const SpacesGrid = () => {
  const currentSpaceId = localStorage.getItem("currentSpaceId")!;
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const { space, error } = useSpace(currentSpaceId);

  useEffect(() => {
    if (spaceId && spaceId !== currentSpaceId) {
      navigate("/spaces");
    }
  }, [spaceId, currentSpaceId]);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <SpaceNavBar spacename={space.spacename} />
      </GridItem>

      <GridItem area="main"></GridItem>
    </Grid>
  );
};

export default SpacesGrid;
