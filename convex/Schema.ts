import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  feedbacks: defineTable({
    description: v.string(),
    firstName: v.string(),
    image: v.string(),
    lastName: v.string(),
    rating: v.float64(),
    subtitle: v.string(),
  }),
});