import Event from "@/components/Event";
import Multiselect from "@/components/Multiselect";
import RootLayout from "@/layouts/default";
import { EventStatus } from "@/lib/consts";
import { eventSchema } from "@/lib/schema";
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
  Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Events() {
  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    control,
    // formState: { errors },
    reset,
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(
      eventSchema.omit({
        organizerId: true,
        groupsIds: true,
        itemsIds: true,
        teachersIds: true,
      })
    ),
  });

  const queryClient = useQueryClient();
  const createEvent = useMutation({
    mutationKey: ["events/create"],
    mutationFn: async (data: z.infer<typeof eventSchema>) => {
      console.log(JSON.stringify(data));
      const res = await fetch(`http://localhost:8080/api/v1/event`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      onClose();
      reset();
    },
  });

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

  const events = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/event", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()),
  });

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
        {events.data && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={{ base: "8", sm: "12", md: "16" }}
          >
            {events.data &&
              events.data.items?.map((e: any) => <Event key={e.id} {...e} />)}
          </Grid>
        )}
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
              organizerId: session.data?.user.id!,
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
            createEvent.mutate(body);
          })}
        >
          <ModalHeader>Добавить новое мероприятие</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
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
                  placeholder="Начальный бюджет (₽)"
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
                isLoading={createEvent.isLoading}
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
}
