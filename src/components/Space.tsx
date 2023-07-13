import { Grid, GridItem } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import SpaceNavBar from "./SpaceNavBar";
import useSpace from "../hooks/useSpace";
import { useEffect, useState } from "react";
import Ranking from "./Ranking";
import Tasks from "./Tasks";
import Summary from "./Summary";

const SpacesGrid = () => {
  const currentSpaceId = localStorage.getItem("currentSpaceId")!;
  const [section, setSection] = useState("Ranking")
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const { space } = useSpace(currentSpaceId);

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
        <SpaceNavBar spacename={space.spacename} onClick={(section) => setSection(section)} />
      </GridItem>

      <GridItem area="main" margin={3}>
        {section === "Ranking" && <Ranking/>}
        {section === "Tasks" && <Tasks tasks={space.tasks}/>}
        {section === "Summary" && <Summary/>}
      </GridItem>
    </Grid>
  );
};

export default SpacesGrid;
