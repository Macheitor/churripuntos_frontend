import { Text } from "@chakra-ui/react";
import useSpaces from "../hooks/useSpaces";

const SpacesGrid = () => {
  const {spaces, error} = useSpaces();

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {spaces.map((space) => (
          <li key={space._id}>{space.spacename}</li>
        ))}
      </ul>
    </>
  );
};

export default SpacesGrid;
