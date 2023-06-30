import Group from "@/components/Group";
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
  Stack,
  Box,
  Input,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Multiselect from "@/components/Multiselect";
import { groupSchema } from "@/lib/schema";

export default function Groups() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(
      groupSchema.omit({
        events: true,
        items: true,
        eventsIds: true,
        itemsIds: true,
        teachersIds: true,
      })
    ),
  });

  const queryClient = useQueryClient();
  const createGroup = useMutation({
    mutationKey: ["groups/create"],
    mutationFn: async (data: z.infer<typeof groupSchema>) => {
      const res = await fetch(`http://localhost:8080/api/v1/group`, {
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
      queryClient.invalidateQueries(["groups"]);
      onClose();
      reset();
    },
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
              Добавить новый коллектив
            </Button>
          </GridItem>
        </Grid>
        <Divider mt={5} mb={5} />
        {groups.data && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {groups.data.items.map((g: any) => (
              <Group key={g.id} id={g.id} defaultValues={g} />
            ))}
          </Grid>
        )}
      </RootLayout>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent
          mx="2.5"
          as="form"
          onSubmit={handleSubmit((data) => {
            const body = {
              ...data,
              eventsIds: !!data.events
                ? data.events.map((event) => event.id)
                : [null],
              teachersIds: !!data.teachers
                ? data.teachers.map((teacher) => teacher.id)
                : [null],
              itemsIds: !!data.items
                ? data.items.map((item) => item.id)
                : [null],
            };
            createGroup.mutate(body);
          })}
        >
          <ModalHeader>Добавить новый коллектив</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={4}>
                <Input
                  placeholder="Название коллектива"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.700"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("name")}
                  autoComplete="off"
                />
                <Multiselect<any, any, true>
                  name={"teachers"}
                  control={control}
                  placeholder="Участники"
                  isMulti
                  options={teachers.data?.items || []}
                />
                {/* <Multiselect<any, any, true> */}
                {/*   name={"events"} */}
                {/*   control={control} */}
                {/*   placeholder="Мероприятия" */}
                {/*   isMulti */}
                {/* /> */}
                {/* <Multiselect<any, any, true> */}
                {/*   name={"items"} */}
                {/*   control={control} */}
                {/*   placeholder="Вложения" */}
                {/*   isMulti */}
                {/* /> */}
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                type="submit"
                bgColor={"green.400"}
                textColor={"white"}
                isLoading={createGroup.isLoading}
                onClick={() => console.log(errors)}
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
