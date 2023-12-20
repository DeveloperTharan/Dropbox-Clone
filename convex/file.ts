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
  },

  handler: async (ctx, args) => {
    const newFolder = await ctx.db.insert("Folder", {
      name: args.name,
      userID: args.userID,
      parentFolder: args.parentFolder,
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

//getsearch files
export const getSearchFile = query({
  args: {
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("File")
      .withIndex("by_user", (query) => query.eq("userID", args.userID))
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("desc")
      .collect();

    return files;
  },
});

//getsearch files
export const getSearchFolder = query({
  args: {
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("Folder")
      .withIndex("by_user", (query) => query.eq("userID", args.userID))
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("desc")
      .collect();

    return files;
  },
});

//update the file
export const update = mutation({
  args: {
    id: v.id("File"),
    userID: v.string(),
    name: v.optional(v.string()),
    isArchived: v.optional(v.boolean()),
    isFavorite: v.optional(v.boolean()),
    isSigned: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    //get Id and rest of all are copy because Id is static we change rest of all things
    const { id, ...rest } = args;

    //fetching existing document
    const existingFile = await ctx.db.get(args.id);

    if (!existingFile) {
      throw new Error("Not found");
    }

    if (existingFile.userID !== args.userID) {
      throw new Error("Unauthorized");
    }

    const file = await ctx.db.patch(args.id, { ...rest });

    return file;
  },
});

//get achive files
export const getAchive = query({
  args: {
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    const file = await ctx.db
      .query("File")
      .withIndex("by_user", (query) => query.eq("userID", args.userID))
      .filter((query) => query.eq(query.field("isArchived"), true))
      .order("asc")
      .collect();

      return file;
  },
});

//remove file
export const remove = mutation({
  args: {
    id: v.id("File"),
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    const existingFile = await ctx.db.get(args.id);

    if (!existingFile) {
      throw new Error("Not found");
    }

    if (existingFile.userID !== args.userID) {
      throw new Error("Unauthorized");
    }

    const file = await ctx.db.delete(args.id);

    return file;
  }
})