import { Td, Tr } from "@chakra-ui/react";

export default function TrButton({
  id,
  eventId,
}: {
  id: number;
  eventId: number;
}) {
  return (
    <Tr
      cursor={"pointer"}
      _hover={{
        bgColor: "gray.100",
      }}
    >
      <Td>Мясо для шашлыка</Td>
      <Td>Шашлык из шеи, домашний маринад</Td>
      <Td>5 кг</Td>
      <Td>₽2800</Td>
    </Tr>
  );
}
