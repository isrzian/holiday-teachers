import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export const groupSchema = z.object({
  name: z.string(),
  eventsIds: z.array(z.number().nullable()),
  itemsIds: z.array(z.number().nullable()),
  teachersIds: z.array(z.number().nullable()),
  events: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  items: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  teachers: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
});

export const eventSchema = z.object({
  organizerId: z.number(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  location: z.string(),
  groupsIds: z.array(z.number().nullable()),
  itemsIds: z.array(z.number().nullable()),
  teachersIds: z.array(z.number().nullable()),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.any(),
  groups: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  items: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  teachers: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
});
