import { v } from "convex/values";
// _generated/server.js or another appropriate file
import { mutation, query } from "./_generated/server";

// Create feedback mutation
export const createFeedback = mutation({
    args: {
      firstName: v.string(),
      lastName: v.string(),
      description: v.string(),
      rating: v.number(),
      imageUrl: v.string(),
      subtitle: v.string(),
    },
    handler: async (ctx, args) => {
      try {
        const feedbacks = await ctx.db.insert("feedbacks", {
          firstName: args.firstName,
          lastName: args.lastName,
          description: args.description,
          rating: args.rating,
          image: args.imageUrl || "",
          subtitle: args.subtitle || "",
        });
        console.log(feedbacks);
        return feedbacks;
      } catch (error) {
        console.error("Error creating feedback:", error);
        throw new Error("Failed to create feedback.");
      }
    }
  });
  

// Query feedbacks
export const getFeedback = query({
  handler: async (ctx) => {
    return await ctx.db.query("feedbacks").collect();
  }
});

