import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignInPage() {
  const session = useSession();

  const [id, setId] = useState<string | number | undefined>(undefined);

  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;

  if (session.status === "loading") return null;
  if (session.status === "authenticated") {
    router.push(callbackUrl || "/events");
    return null;
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={"white"}
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
            onChange={(e) => setId(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
            isDisabled={!id}
            onClick={() =>
              signIn("credentials", {
                id,
                callbackUrl,
                redirect: false,
              })
            }
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
