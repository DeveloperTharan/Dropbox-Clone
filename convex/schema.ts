import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const File = {
  userID: v.string(),
  name: v.string(),
  url: v.string(),
  size: v.number(),
  isArchived: v.boolean(),
  isFavorite: v.boolean(),
  type: v.string(),
  parentFolder: v.optional(v.id("Folder")),
};

export const Folder = {
  userID: v.string(),
  name: v.string(),
  parentFolder: v.optional(v.id("Folder")),
  isArchived: v.boolean(),
};

export default defineSchema({
  File: defineTable(File)
    .index("by_user", ["userID"])
    .index("by_parent_folder", ["userID","parentFolder"]),
  Folder: defineTable(Folder)
    .index("by_user", ["userID"])
    .index("by_parent_folder", ["userID","parentFolder"]),
});
