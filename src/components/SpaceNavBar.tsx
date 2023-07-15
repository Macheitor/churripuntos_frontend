import { Button, HStack, Stack, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";

interface Props {
  spacename: string;
  onClick: (section: "Ranking" | "Tasks" | "Summary") => void;
}
const SpaceNavBar = ({ spacename, onClick }: Props) => {
  const navigate = useNavigate();

  return (
    <Stack>
      <HStack justify={"space-between"} padding={3}>
        <ChevronLeftIcon boxSize={10} onClick={() => navigate(-1)} />
        <Text fontSize="xl">{spacename}</Text>
        <EditIcon boxSize={6} />
      </HStack>
      <HStack justifyContent="center">
        <Button onClick={() => onClick("Ranking")}>Ranking</Button>
        <Button onClick={() => onClick("Tasks")}>Tasks List</Button>
        <Button onClick={() => onClick("Summary")}>Summary</Button>
      </HStack>
    </Stack>
  );
};

export default SpaceNavBar;
