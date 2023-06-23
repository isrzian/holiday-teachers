import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";

const avatars = [
  {
    name: "1",
    url: "https://avatars.dicebear.com/api/male/a.svg",
  },
  {
    name: "2",
    url: "https://avatars.dicebear.com/api/male/b.svg",
  },
  {
    name: "3",
    url: "https://avatars.dicebear.com/api/male/c.svg",
  },
  {
    name: "4",
    url: "https://avatars.dicebear.com/api/male/d.svg",
  },
  {
    name: "5",
    url: "https://avatars.dicebear.com/api/male/e.svg",
  },
];

export default function SignUp() {
  const avatarSize = useBreakpointValue({ base: "md", md: "lg" });
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Планируйте мероприятия{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, green.400,green.500)"
              bgClip="text"
            >
              &
            </Text>{" "}
            наслаждайтесь
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={avatarSize}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, green.400,green.500)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, green.400,green.500)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              ВЫ
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Начните уже сегодня
              <Text
                as={"span"}
                bgGradient="linear(to-r, green.400,green.500)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Наше приложение предоставляет простой и интуитивно понятный
              интерфейс, позволяющий создавать и организовывать бюджеты для
              различных мероприятий.
            </Text>
          </Stack>
          <Box as={"form"}>
            <Stack spacing={4}>
              <Input
                placeholder="Ваше имя"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="+7 (___) ___-__-__"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Stack pt={6}>
                <Text align={"center"}>
                  Уже есть учетная запись?{" "}
                  <Link color={"blue.400"} href={"/signin"}>
                    Войти
                  </Link>
                </Text>
              </Stack>
              <Button
                fontFamily={"heading"}
                w={"full"}
                bgColor="green.400"
                color={"white"}
                _hover={{
                  bgColor: "green.500",
                }}
              >
                Присоединиться
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
