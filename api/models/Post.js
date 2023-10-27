/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  replies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
