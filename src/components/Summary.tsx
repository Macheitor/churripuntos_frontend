import { Box, Center, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { Activity } from "./Space";

interface Props {
  tasksDone: Activity[];
}

const Summary = ({ tasksDone }: Props) => (
  <>
    <Center>
      <Heading size={"lg"}>SUMMARY</Heading>
    </Center>
    {tasksDone.map((t) => (
      <Box w="100%" bg={"gray.700"} borderRadius={10}>
        <HStack justify={"space-between"} p={2}>
          <Text>{t.taskname}</Text>
          <Text>{t.points} points</Text>
          <Text>{t.username}</Text>
        </HStack>
      </Box>
    ))}
  </>
);

export default Summary;
