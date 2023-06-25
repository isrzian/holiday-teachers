import { EventStatus } from "@/lib/consts";
import { localizeDate } from "@/lib/localizeDate";
import { eventSchema } from "@/lib/schema";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FiArrowRight } from "react-icons/fi";
import { z } from "zod";

export default function Event(props: z.infer<typeof eventSchema>) {
  const router = useRouter();

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

  const localizedStartDate = localizeDate(props.startDate);
  const localizedEndDate = localizeDate(props.endDate);

  return (
    <Center py={6}>
      <Box w={"full"} bg={"white"} rounded={"sm"} p={6} overflow={"hidden"}>
        <Stack>
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
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {/* @ts-ignore */}
              {EventStatus[props.status]}
            </Text>
            <Spacer />
            <IconButton
              aria-label="редактировать"
              size="sm"
              variant="outline"
              onClick={() => router.push(`/events/${(props as any).id}`)}
            >
              <FiArrowRight />
            </IconButton>
          </HStack>
          <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
            {props.name}
          </Heading>
          <Text color={"gray.700"} fontSize="sm" fontStyle="italic">
            {props.location}
          </Text>
          <Text color={"gray.700"}>{props.description}</Text>
          <Text color="gray.700" fontWeight="semibold">
            Бюджет: ₽{props.budget}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            {organizer.data && (
              <Text fontWeight={600}>{organizer.data.name}</Text>
            )}
            <Text color={"gray.700"}>
              {localizedStartDate} - {localizedEndDate}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
