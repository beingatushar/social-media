const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: String,

    image: {
      public_id: String,
      url: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must have an owner"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: [true, "Comment cannot be empty"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add a virtual property for the comment count
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Add a method to add a comment to the post
postSchema.methods.addComment = function (user, comment) {
  this.comments.push({ user, comment });
  return this.save();
};

// Add a method to remove a comment from the post
postSchema.methods.removeComment = function (commentId) {
  const commentIndex = this.comments.findIndex(
    (comment) => comment._id.toString() === commentId
  );

  if (commentIndex !== -1) {
    this.comments.splice(commentIndex, 1);
    return this.save();
  } else {
    throw new Error("Comment not found");
  }
};

module.exports = mongoose.model("Post", postSchema);
