import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  File: defineTable({
    userID: v.string(),
    name: v.string(),
    url: v.string(),
    size: v.number(),
    isArchived: v.boolean(),
    isFavorite: v.boolean(),
    isSigned: v.boolean(),
    type: v.string(),
  })
    .index("by_user", ["userID"])
});