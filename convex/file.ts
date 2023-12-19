import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

//creating file
export const createFile = mutation({
  //giving file info as argument
  args: {
    name: v.string(),
    size: v.float64(),
    type: v.string(),
    url: v.string(),
    userID: v.string(),
    parentFolder: v.optional(v.id("Folder")),
  },

  //handling user and file
  handler: async (ctx, args) => {
    const newfile = await ctx.db.insert("File", {
      name: args.name,
      userID: args.userID,
      size: args.size,
      type: args.type,
      url: args.url,
      isArchived: false,
      isFavorite: false,
      isSigned: false,
      parentFolder: args.parentFolder,
    });

    return newfile;
  },
});

//get file (non-achived)
export const getFiles = query({
  args: {
    userID: v.string(),
    parentFolder: v.optional(v.id("Folder")),
  },

  handler: async (ctx, args) => {
    //get files from File through userId and parent folder
    const files = await ctx.db
      .query("File")
      .withIndex("by_parent_folder", (query) =>
        query.eq("userID", args.userID).eq("parentFolder", args.parentFolder)
      )
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("asc")
      .collect();

    return files;
  },
});

//create folder
export const creatrFolder = mutation({
  args: {
    userID: v.string(),
    name: v.string(),
    parentFolder: v.optional(v.id("Folder")),
    file: v.optional(
      v.object({
        userID: v.string(),
        name: v.string(),
        url: v.string(),
        size: v.number(),
        isArchived: v.boolean(),
        isFavorite: v.boolean(),
        isSigned: v.boolean(),
        type: v.string(),
        parentFolder: v.optional(v.id("Folder")),
      })
    ),
  },

  handler: async (ctx, args) => {
    const newFolder = await ctx.db.insert("Folder", {
      name: args.name,
      userID: args.userID,
      parentFolder: args.parentFolder,
      file: args.file,
      isArchived: false,
      isFavorite: false,
    });

    return newFolder;
  },
});

//get folder (non-achive)
export const getFolders = query({
  args: {
    userID: v.string(),
    parentFolder: v.optional(v.id("Folder")),
  },

  handler: async (ctx, args) => {
    const getFolder = await ctx.db
      .query("Folder")
      .withIndex("by_parent_folder", (query) =>
        query.eq("userID", args.userID).eq("parentFolder", args.parentFolder)
      )
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("asc")
      .collect();

      return getFolder;
  },
});
