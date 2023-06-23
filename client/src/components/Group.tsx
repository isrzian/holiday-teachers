import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Group({ name }: { name: string }) {
  return (
    <Center>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"smc"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading
              fontSize={"2xl"}
              fontWeight={500}
              fontFamily={"body"}
              textAlign={"center"}
            >
              Базовая кафeдра ИС
            </Heading>
          </Stack>
          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>11</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Участников
              </Text>
            </Stack>
          </Stack>
          <Button
            w={"full"}
            mt={8}
            bg={"green.400"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bgColor: "green.500",
            }}
          >
            Присоединиться
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
