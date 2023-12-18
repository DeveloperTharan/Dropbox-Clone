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
    });

    return newfile;
  },
});

//get all documents (non-achived)
export const getFiles = query({
  args: {
    userID: v.string(),
  },

  handler: async (ctx, args) => {
    //get files from File through userId
    const files = await ctx.db
      .query("File")
      .withIndex("by_user", (query) => query.eq("userID", args.userID))
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("asc")
      .collect();

    return files;
  },
});