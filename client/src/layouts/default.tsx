import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Input,
  ButtonGroup,
  Button,
  Heading,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiChevronDown, FiUser } from "react-icons/fi";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Мероприятия", icon: FiHome, href: "/events" },
  { name: "Коллективы", icon: FiUser, href: "/groups" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const session = useSession({ required: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (session.status === "loading") return null;
  if (!session.data) router.push("/signin");

  return (
    <Box minH="100vh" bg={"gray.50"} w="full">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onMenuOpen={onOpen} name={session.data.user?.name} />
      <Box ml={{ base: 0, md: 60 }} p="5">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { pathname } = useRouter();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          userSelect={"none"}
        >
          EventPlanner
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          isActive={pathname === link.href}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  href: string;
  isActive: boolean;
}

const NavItem = ({ icon, children, href, isActive, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        my="1"
        role="group"
        cursor="pointer"
        bg={isActive ? "green.400" : "transparent"}
        color={isActive ? "white" : "initial"}
        _hover={{
          bg: "green.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onMenuOpen: () => void;
  name?: string | null;
}
const MobileNav = ({ onMenuOpen, name, ...rest }: MobileProps) => {
  const session = useSession();
  const deletionDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: session.data?.user.name,
      phone: session.data?.user.phone,
    },
  });

  const editProfile = useMutation({
    mutationKey: [`teacher/edit/${session.data?.user.id}`],
    mutationFn: async (data: z.infer<typeof signUpSchema>) => {
      const res = await fetch(
        `http://localhost:8080/api/v1/teacher/${session.data?.user.id}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return res.json();
    },
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onMenuOpen}
          variant="outline"
          aria-label="Открыть меню"
          icon={<FiMenu />}
        />
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          userSelect="none"
        >
          EventPlanner
        </Text>
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <HStack>
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                      <Text fontSize="lg">{name}</Text>
                    </HStack>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem onClick={onOpen}>Профиль</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Выйти</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <Modal
        onClose={deletionDisclosure.onClose}
        isOpen={deletionDisclosure.isOpen}
        isCentered
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent mx="2.5">
          <ModalHeader>Подтверждение</ModalHeader>
          <ModalBody>
            <Heading size="md">
              Вы собираетесь удалить свою учетную запись. Это действие
              невозможно отменить. Вы уверены?
            </Heading>
          </ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <ButtonGroup>
              <Button
                type="submit"
                bgColor={"red.400"}
                _hover={{
                  bgColor: "red.500",
                }}
                textColor={"white"}
                onClick={async () => {
                  await fetch(
                    `http://localhost:8080/api/v1/teacher/${session.data?.user.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Accept: "*/*",
                      },
                    }
                  );
                  signOut();
                }}
              >
                Удалить
              </Button>
              <Button onClick={onClose}>Отменить</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => editProfile.mutate(data))}
        >
          <ModalHeader>Информация о пользователе</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Heading as="h4" size="md" fontWeight="medium">
                  Ваш уникальный идентификатор: {session.data?.user.id}
                </Heading>
                <Input
                  placeholder="Ваше имя"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  autoComplete="off"
                  {...register("name")}
                />
                <Input
                  placeholder="+7 (___) ___-__-__"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("phone")}
                />
                <Button
                  variant="outline"
                  colorScheme="red"
                  size={"sm"}
                  onClick={() => {
                    onClose();
                    deletionDisclosure.onOpen();
                  }}
                >
                  Удалить учетную запись
                </Button>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                type="submit"
                bgColor={"green.400"}
                textColor={"white"}
                isLoading={editProfile.isLoading}
                onClick={() => console.log(errors)}
              >
                Сохранить
              </Button>
              <Button onClick={onClose}>Закрыть</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
