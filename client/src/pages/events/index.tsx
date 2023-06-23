import Event from "@/components/Event";
import RootLayout from "@/layouts/default";
import {
  Button,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ButtonGroup,
  Box,
  Input,
  Stack,
  Textarea,
  HStack,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FiCalendar } from "react-icons/fi";

export default function Events() {
  // const session = useSession({ required: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <RootLayout>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <GridItem>
            <Button
              bgColor="green.400"
              textColor={"white"}
              size="md"
              _hover={{
                bgColor: "green.500",
              }}
              onClick={onOpen}
            >
              Добавить новое мероприятие
            </Button>
          </GridItem>
        </Grid>
        <Divider mt={5} mb={5} />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={{ base: "8", sm: "12", md: "16" }}
        >
          <Event />
        </Grid>
      </RootLayout>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent mx="2.5">
          <ModalHeader>Добавить новое мероприятие</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Input
                  placeholder="Название мероприятия"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  placeholder="Описание мероприятия"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  rows={10}
                />
                <Input
                  placeholder="Место проведения"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="Начальный бюджет (₽)"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <HStack>
                  <InputGroup>
                    <Input
                      placeholder="Дата начала"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                    <InputRightElement>
                      <FiCalendar />
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup>
                    <Input
                      placeholder="Дата окончания"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                    <InputRightElement>
                      <FiCalendar />
                    </InputRightElement>
                  </InputGroup>
                </HStack>
                <Select
                  placeholder="Организующий коллектив"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Select
                  placeholder="Участники мероприятия"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={onClose}
                bgColor={"green.400"}
                textColor={"white"}
              >
                Сохранить
              </Button>
              <Button onClick={onClose}>Отменить</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
