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
  useDisclosure,
  Box,
  Stack,
  Textarea,
  Input,
} from "@chakra-ui/react";
import TrButton from "@/components/TrButton";
import { useQuery } from "@tanstack/react-query";
import { eventSchema } from "@/lib/schema";
import { z } from "zod";
import { EventStatus } from "@/lib/consts";
import { localizeDate } from "@/lib/localizeDate";

const EventPageContent = (props: z.infer<typeof eventSchema>) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const moneyDisclosure = useDisclosure();
  const localizedStartDate = localizeDate(props.startDate);
  const localizedEndDate = localizeDate(props.endDate);

  const organizer = useQuery({
    queryKey: [`teacher/${props.organizerId}`],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/api/v1/teacher/${props.organizerId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      return res.json();
    },
  });

  /* const teachers = useQueries({
    queries: !!props.teachersIds
      ? props.teachersIds.map((id) => {
          return {
            queryKey: [`teacher/${id}`],
            queryFn: async () => {
              const res = await fetch(
                `http://localhost:8080/api/v1/teacher/${id}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                  },
                }
              );
              return res.json();
            },
          };
        })
      : [],
  }); */

  return (
    <>
      <RootLayout>
        <Flex mt={5} mb={20} flexDir={"column"} gap={2}>
          <HStack>
            <Text
              color={
                props.status === "in_process"
                  ? "yellow.500"
                  : props.status === "planned"
                  ? "purple.500"
                  : "green.500"
              }
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"xs"}
              letterSpacing={1.1}
            >
              {/* @ts-ignore */}
              {EventStatus[props.status]}
            </Text>
            <Spacer />
            <ButtonGroup>
              <Button>Редактировать</Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await fetch(
                    `http://localhost:8080/api/v1/event/${(props as any).id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Accept: "*/*",
                      },
                    }
                  );
                  router.push("/events");
                }}
              >
                Удалить
              </Button>
            </ButtonGroup>
          </HStack>
          <Text color={"gray.700"}>
            {localizedStartDate} - {localizedEndDate}
          </Text>
          <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
            {props.name}
          </Heading>
          <Text color={"gray.700"}>{props.description}</Text>
          {organizer.data && (
            <Text>
              <Text as="span" fontWeight="semibold">
                Организатор:{" "}
              </Text>
              {organizer.data.name}
            </Text>
          )}
          {/* <Text>
            <Text as="span" fontWeight="semibold">
              Участники:{" "}
            </Text>
            {!!teachers && teachers.length > 0
              ? teachers.map((teacher) => teacher.data.name).join(", ")
              : "Нет участников мероприятия"}
          </Text> */}
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
          <Button
            my="5"
            colorScheme="green"
            variant="outline"
            onClick={moneyDisclosure.onOpen}
          >
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
              </Tr>
            </Thead>
            <Tbody>
              <TrButton id={1} eventId={(props as any).id} />
              <Tr>
                <Td>Овощи</Td>
                <Td>Редис, огурцы, помидоры, зеленый лук</Td>
                <Td>3 кг</Td>
                <Td>₽900</Td>
              </Tr>
              <Tr>
                <Td>Пиво</Td>
                <Td>Krušovice (Светлое)</Td>
                <Td>24 бутылки</Td>
                <Td>₽1900</Td>
              </Tr>
              <Tr>
                <Td>Аренда</Td>
                <Td>Дом, баня, купель</Td>
                <Td>2 суток</Td>
                <Td>₽28400</Td>
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
      <Modal
        onClose={moneyDisclosure.onClose}
        isOpen={moneyDisclosure.isOpen}
        isCentered
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent mx="2.5">
          <ModalHeader>Сделать вклад</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Input
                  placeholder="Сумма (₽)"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button bgColor={"green.400"} textColor={"white"}>
                Внести
              </Button>
              <Button onClick={moneyDisclosure.onClose}>Отменить</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  placeholder="Описание"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  rows={5}
                />
                <Input
                  placeholder="Количество"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="Стоимость (₽)"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
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

  const event = useQuery({
    queryKey: [`events/${id}`],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/api/v1/event/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      return res.json();
    },
  });

  if (!!id) return <EventPageContent {...event.data} />;
}
