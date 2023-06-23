import RootLayout from "@/layouts/default";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Heading,
  Flex,
  HStack,
  Spacer,
  Button,
  ButtonGroup,
  IconButton,
  useDisclosure,
  Box,
  Stack,
  Textarea,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";

const EventPageContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <RootLayout>
        <Flex mt={5} mb={20} flexDir={"column"} gap={2}>
          <HStack>
            <Text
              color={"yellow.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"xs"}
              letterSpacing={1.1}
            >
              Планирование
            </Text>
            <Spacer />
            <ButtonGroup>
              <Button>Редактировать</Button>
              <Button colorScheme="red">Удалить</Button>
            </ButtonGroup>
          </HStack>
          <Text color={"gray.500"}>Июль 09, 2023 - Июль 10, 2023</Text>
          <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
            Поездка в Ергаки
          </Heading>
          <Text color={"gray.500"}>
            Приготовьтесь погрузиться в уникальную красоту горной природы и
            величественные пейзажи Ергаков! Расположенные в Саянских горах,
            Ергаки предлагают незабываемые приключения для любителей активного
            отдыха и природных красот.
          </Text>
          <Text>
            <Text as="span" fontWeight="semibold">
              Организатор:{" "}
            </Text>
            Леонид Скорик
          </Text>
          <Text>
            <Text as="span" fontWeight="semibold">
              Участники:{" "}
            </Text>
            Александр Иванов, Екатерина Смирнова, Михаил Кузнецов, Анна Попова,
            Иван Васильев, Ольга Петрова, Николай Соколов, Мария Морозова,
            Сергей Новиков, Елена Федорова
          </Text>
        </Flex>
        <ButtonGroup>
          <Button
            my="5"
            colorScheme="purple"
            variant="outline"
            onClick={onOpen}
          >
            Добавить предмет(-ы)
          </Button>
          <Button my="5" colorScheme="green" variant="outline" onClick={onOpen}>
            Сделать вклад в бюджет
          </Button>
        </ButtonGroup>
        <TableContainer>
          <Table variant="simple">
            <TableCaption fontSize="xl">
              Итоговый бюджет:{" "}
              <Text fontWeight="semibold" as="span">
                ₽34000
              </Text>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Наименование</Th>
                <Th>Описание</Th>
                <Th>Количество</Th>
                <Th>Стоимость</Th>
                <Th>Действия</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Мясо для шашлыка</Td>
                <Td>Шашлык из шеи, домашний маринад</Td>
                <Td>5 кг</Td>
                <Td>₽2800</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      aria-label="редактировать"
                      size="sm"
                      variant="outline"
                      colorScheme="green"
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      aria-label="удалить"
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                    >
                      <FiTrash />
                    </IconButton>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Овощи</Td>
                <Td>Редис, огурцы, помидоры, зеленый лук</Td>
                <Td>3 кг</Td>
                <Td>₽900</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      aria-label="редактировать"
                      size="sm"
                      variant="outline"
                      colorScheme="green"
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      aria-label="удалить"
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                    >
                      <FiTrash />
                    </IconButton>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Пиво</Td>
                <Td>Krušovice (Светлое)</Td>
                <Td>24 бутылки</Td>
                <Td>₽1900</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      aria-label="редактировать"
                      size="sm"
                      variant="outline"
                      colorScheme="green"
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      aria-label="удалить"
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                    >
                      <FiTrash />
                    </IconButton>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Аренда</Td>
                <Td>Дом, баня, купель</Td>
                <Td>2 суток</Td>
                <Td>₽28400</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      aria-label="редактировать"
                      size="sm"
                      variant="outline"
                      colorScheme="green"
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      aria-label="удалить"
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                    >
                      <FiTrash />
                    </IconButton>
                  </ButtonGroup>
                </Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Наименование</Th>
                <Th>Описание</Th>
                <Th>Количество</Th>
                <Th>Стоимость</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </RootLayout>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent mx="2.5">
          <ModalHeader>Добавить предмет(-ы)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Input
                  placeholder="Наименование"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  placeholder="Описание"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  rows={5}
                />
                <Input
                  placeholder="Количество"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="Стоимость (₽)"
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
                bgColor={"purple.400"}
                textColor={"white"}
              >
                Добавить
              </Button>
              <Button onClick={onClose}>Отменить</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function EventId() {
  const { query } = useRouter();
  const id = query.id as string;
  if (!!id) return <EventPageContent />;
}
