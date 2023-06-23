import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export default function SignIn(): JSX.Element {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Введите ID профиля
        </Heading>
        <FormControl>
          <Input
            placeholder="Идентификатор"
            _placeholder={{ color: "gray.500" }}
            type="text"
            autoComplete="off"
            autoCorrect="off"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
          >
            Войти
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            Нет учетной записи?{" "}
            <Link color={"blue.400"} href={"/signup"}>
              Создать
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
