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
  Select,
} from "@chakra-ui/react";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { eventSchema } from "@/lib/schema";
import { z } from "zod";
import { EventStatus } from "@/lib/consts";
import { localizeDate } from "@/lib/localizeDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Multiselect from "@/components/Multiselect";

const EventPageContent = ({
  defaultValues,
}: {
  defaultValues: z.infer<typeof eventSchema>;
}) => {
  let itemsBudget = 0;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { handleSubmit, register, control, reset } = useForm<
    z.infer<typeof eventSchema>
  >({
    resolver: zodResolver(
      eventSchema.omit({
        groupsIds: true,
        itemsIds: true,
        teachersIds: true,
      })
    ),
    defaultValues: {
      ...defaultValues,
      startDate: new Date(defaultValues.startDate).toISOString().split("T")[0],
      endDate: new Date(defaultValues.startDate).toISOString().split("T")[0],
    },
  });

  const localizedStartDate = localizeDate(defaultValues?.startDate);
  const localizedEndDate = localizeDate(defaultValues?.endDate);

  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/group", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
  });

  // Везде где items нужно будет поменять порт 3000 на 8080, порт 3000 это из которого некстовский (не нестовский) экспрес возвращает моковые предметы
  const items = useQuery({
    queryKey: ["items"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/event/item", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const teachers = useQuery({
    queryKey: ["teachers"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/teacher", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
  });

  const organizer = useQuery({
    queryKey: [`teacher/${defaultValues.organizerId}`],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/api/v1/teacher/${defaultValues.organizerId}`,
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

  const queryClient = useQueryClient();
  const editEvent = useMutation({
    mutationKey: ["events/create"],
    mutationFn: async (data: z.infer<typeof eventSchema>) => {
      const res = await fetch(
        // @ts-ignore
        `http://localhost:8080/api/v1/event/${defaultValues.id}`,
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
      // @ts-ignore
      queryClient.invalidateQueries([`events/${defaultValues.id}`]);
      onClose();
    },
  });

  return (
    <>
      <RootLayout>
        <Flex mt={5} mb={20} flexDir={"column"} gap={2}>
          <HStack>
            <Text
              color={
                defaultValues.status === "in_process"
                  ? "yellow.500"
                  : defaultValues.status === "planned"
                  ? "purple.500"
                  : "green.500"
              }
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"xs"}
              letterSpacing={1.1}
            >
              {/* @ts-ignore */}
              {EventStatus[defaultValues.status]}
            </Text>
            <Spacer />
            <ButtonGroup>
              <Button onClick={onOpen}>Редактировать</Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await fetch(
                    `http://localhost:8080/api/v1/event/${
                      (defaultValues as any).id
                    }`,
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
            {defaultValues.name}
          </Heading>
          <Text color={"gray.700"}>{defaultValues.description}</Text>
          {organizer.data && (
            <Text>
              <Text as="span" fontWeight="semibold">
                Организатор:{" "}
              </Text>
              {organizer.data.name}
            </Text>
          )}
          <Text>
            <Text as="span" fontWeight="semibold">
              Коллективы:{" "}
            </Text>
            {!!defaultValues.groups && defaultValues.groups.length > 0
              ? defaultValues.groups.map((group) => group.name).join(", ")
              : "Нет коллективов"}
          </Text>
          <Text>
            <Text as="span" fontWeight="semibold">
              Участники:{" "}
            </Text>
            {!!defaultValues.teachers && defaultValues.teachers.length > 0
              ? defaultValues.teachers.map((teacher) => teacher.name).join(", ")
              : "Нет участников мероприятия"}
          </Text>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <TableCaption fontSize="xl">
              Итоговый бюджет:{" "}
              <Text fontWeight="semibold" as="span">
                ₽
                {defaultValues.budget +
                  items.data?.items.reduce(
                    (acc: any, cur: any) => acc + cur.price,
                    itemsBudget
                  )}
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
              {/* Нужно будет заменить items на defaultValues.items (в EventId мы ловим все нужные предметы которые относятся к ивенту, мапаем, а потом записываем в дефолт валью)*/}
              {items.data?.items.map((item: any) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.price}</Td>
                </Tr>
              ))}
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
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="3xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => {
            const body = {
              ...data,
              organizerId: data.organizer.id,
              budget: parseInt(data.budget),
              groupsIds: !!data.groups
                ? data.groups.map((group) => group.id)
                : [null],
              teachersIds: !!data.teachers
                ? data.teachers.map((teacher) => teacher.id)
                : [null],
              itemsIds: !!data.items
                ? data.items.map((item) => item.id)
                : [null],
            };
            editEvent.mutate(body);
          })}
        >
          <ModalHeader>Добавить новое мероприятие</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Multiselect<any, any, true>
                  name={"organizer"}
                  placeholder="Организатор"
                  options={teachers.data?.items}
                  control={control}
                />
                <Select
                  placeholder="Статус мероприятия"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("status")}
                >
                  {Object.entries(EventStatus).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder="Название мероприятия"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("name")}
                  autoComplete="off"
                />
                <Textarea
                  placeholder="Описание мероприятия"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  rows={10}
                  {...register("description")}
                />
                <Input
                  placeholder="Место проведения"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("location")}
                />
                <Input
                  placeholder="Бюджет (₽)"
                  type="number"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("budget")}
                />
                <HStack>
                  <Input
                    placeholder="Дата начала"
                    type="date"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.700"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    {...register("startDate")}
                  />
                  <Input
                    placeholder="Дата окончания"
                    type="date"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.700"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    {...register("endDate")}
                  />
                </HStack>
                <Multiselect<any, any, true>
                  name={"items"}
                  placeholder="Вложения"
                  options={items.data?.items}
                  control={control}
                  isMulti
                />
                <Multiselect<any, any, true>
                  name={"groups"}
                  placeholder="Организующий коллектив"
                  options={groups.data?.items}
                  control={control}
                  isMulti
                />
                <Multiselect<any, any, true>
                  name={"teachers"}
                  placeholder="Участники"
                  options={teachers.data?.items}
                  control={control}
                  isMulti
                />
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                type={"submit"}
                bgColor={"green.400"}
                textColor={"white"}
                // isLoading={createEvent.isLoading}
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Отменить
              </Button>
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

  const organizer = useQuery({
    queryKey: [`teachers/${id}`],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/api/v1/teacher/${event.data.organizerId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      return res.json();
    },
    enabled: !!event.data?.organizerId,
  });

  const groups = useQueries({
    queries: !!event.data?.groupsIds
      ? event.data.groupsIds.map((id: any) => {
          return {
            queryKey: [`group/${id}`],
            queryFn: async () => {
              const res = await fetch(
                `http://localhost:8080/api/v1/group/${id}`,
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
  });

  //
  const items = useQueries({
    queries:
      !!event.data?.itemsIds && event.data.itemsIds.length > 0
        ? event.data.itemsIds.map((id: any) => {
            return {
              queryKey: [`item/${id}`],
              queryFn: async () => {
                const res = await fetch(
                  `http://localhost:8080/api/v1/event/item/${id}`,
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
  });

  const teachers = useQueries({
    queries: !!event.data?.teachersIds
      ? event.data.teachersIds.map((id: any) => {
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
  });

  if (
    event.isLoading ||
    organizer.isFetching ||
    groups.some((group) => group.isFetching) ||
    teachers.some((teacher) => teacher.isFetching) ||
    items.some((item) => item.isFetching)
  ) {
    return null;
  }

  event.data.teachers = teachers.map((teacher) => teacher.data);
  event.data.items = items.map((item) => item.data);
  event.data.groups = groups.map((group) => group.data);
  event.data.organizer = organizer.data;

  return <EventPageContent defaultValues={event.data} />;
}
