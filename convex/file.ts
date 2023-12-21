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
  },

  handler: async (ctx, args) => {
    //get Id and rest of all are copy because Id is static we change rest of all things
    const { id, ...rest } = args;

    //fetching existing folder
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
  },
});

//getfavorite files
export const getFavorite = query({
  args: {
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    const file = await ctx.db
      .query("File")
      .withIndex("by_user", (query) => query.eq("userID", args.userID))
      .filter((query) => query.eq(query.field("isFavorite"), true))
      .order("asc")
      .collect();

    return file;
  },
});

//rename folder
export const updateFolder = mutation({
  args: {
    id: v.id("Folder"),
    userID: v.string(),
    name: v.string(),
  },

  handler: async (ctx, args) => {
    const { id, ...rest } = args;

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

//deleting folder
export const archiveFolder = mutation({
  args: {
    id: v.id("Folder"),
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    //fetching existing folder
    const existingFolder = await ctx.db.get(args.id);

    if (!existingFolder) {
      throw new Error("Not found");
    }

    if (existingFolder.userID !== args.userID) {
      throw new Error("unAuthenticated");
    }

    //delete that folder
    const folder = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    //deleting all the child of that folder
    const recresiveArchie = async (folderId: Id<"Folder">) => {
      const children = await ctx.db
        .query("Folder")
        .withIndex("by_parent_folder", (query) =>
          query.eq("userID", args.userID).eq("parentFolder", folderId)
        )
        .collect();

      //for-loop for continue this for all the children
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        //it will create a loop and continue this.
        //(check every single child and confirm arhived or not it will go at the end of the folder childrens)
        await recresiveArchie(child._id);
      }
    };

    //it will get all the folder recresively
    recresiveArchie(args.id);

    return folder;
  },
});

//get achive folders
export const getAchiveFolders = query({
  args: {
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    const folders = await ctx.db
      .query("Folder")
      .withIndex("by_user", (query) => query.eq("userID", args.userID))
      .filter((query) => query.eq(query.field("isArchived"), true))
      .order("asc")
      .collect();

    return folders;
  },
});

//restore archived Folder
export const restoreFolder = mutation({
  args: { id: v.id("Folder"), userID: v.string() },

  handler: async (ctx, args) => {
    //fetching existing folder
    const existingFolder = await ctx.db.get(args.id);

    if (!existingFolder) {
      throw new Error("Not found");
    }

    if (existingFolder.userID !== args.userID) {
      throw new Error("Unauthorized");
    }

    //for parent exist or not in archive
    const options: Partial<Doc<"Folder">> = {
      isArchived: false,
    };

    //checking parent folder exist
    if (existingFolder.parentFolder) {
      const parent = await ctx.db.get(existingFolder.parentFolder); //if exist get
      //else give a option undefine
      if (parent?.isArchived) {
        options.parentFolder = undefined;
      }
    }

    //restore all the child of that folder
    const recursiveRestore = async (folderId: Id<"Folder">) => {
      const children = await ctx.db
        .query("Folder")
        .withIndex("by_parent_folder", (q) =>
          q.eq("userID", args.userID).eq("parentFolder", folderId)
        )
        .collect();

      //for-loop for continue this for all the children
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        //it will create a loop and continue this.
        //(check every single child and confirm restored or not it will go at the end of the folders childrens)
        await recursiveRestore(child._id);
      }
    };

    //restoring archived folders
    const folder = await ctx.db.patch(args.id, options);

    //it will get all the folders recresively
    recursiveRestore(args.id);

    return folder;
  },
});

//delet the folder permanently
export const removFolder = mutation({
  args: { id: v.id("Folder"), userID: v.string() },

  handler: async (ctx, args) => {
    //fetching existing folder
    const existingFolder = await ctx.db.get(args.id);

    if (!existingFolder) {
      throw new Error("Not found");
    }

    if (existingFolder.userID !== args.userID) {
      throw new Error("Unauthorized");
    }

    //delete all the child of that folder
    const recursiveDelete = async (folderId: Id<"Folder">) => {
      const children = await ctx.db
        .query("Folder")
        .withIndex("by_parent_folder", (q) =>
          q.eq("userID", args.userID).eq("parentFolder", folderId)
        )
        .collect();

      //for-loop for continue this for all the children
      for (const child of children) {
        await ctx.db.delete(child._id);

        //it will create a loop and continue this.
        //(check every single child and confirm deleted or not it will go at the end of the folder childrens)
        await recursiveDelete(child._id);
      }
    };

    //deleting that folder
    const folder = await ctx.db.delete(args.id);

    //it will get all the folders recresively
    recursiveDelete(args.id);

    return folder;
  },
});
