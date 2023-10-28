/* eslint-disable prettier/prettier */
const express = require('express');
const Post = require('../models/Post');

const routes = express.Router();

routes.post('/create', async function (req, res) {
  try {
    const {content, userId} = req.body;
    console.log('received ids for follow req con, userId', content, userId);
    const newPostData = {user: userId};
    if (content) {
      newPostData.content = content;
    }

    const newPost = new Post(newPostData);
    await newPost.save();

    return res.status(201).json({
      message: 'posted successfully',
    });
  } catch (error) {
    console.log('error in posting', error);
    return res.status(500).json({
      message: 'error in positing',
    });
  }
});

routes.put('/post/:postId/like', async function (req, res) {
  try {
    const {postId, userId} = req.params;

    const post = await Post.findById(postId).populate('user', 'name');
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: {likes: userId},
      },
      {new: true},
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: 'post not found',
      });
    }

    updatedPost.user = post.user;

    return res.status(200).json({
      message: 'successfully liked post',
      updatedPost,
    });
  } catch (error) {
    console.log('error occurred while liking', error);
    return res.status(500).json({
      message: 'error occurred while liking',
    });
  }
});

routes.put('/post/:postId/unlike', async function (req, res) {
  try {
    const {postId, userId} = req.params;

    const post = await Post.findById(postId).populate('user', 'name');
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {likes: userId},
      },
      {new: true},
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: 'post not found',
      });
    }

    updatedPost.user = post.user;

    return res.status(200).json({
      message: 'successfully liked post',
      updatedPost,
    });
  } catch (error) {
    console.log('error occurred while un-liking', error);
    return res.status(500).json({
      message: 'error occurred while un-liking',
    });
  }
});

routes.get('/all-posts', async function (req, res) {
  try {
    const posts = await Post.find()
      .populate('user', 'name')
      .sort({createdAt: -1});

    return res.status(200).json({
      message: 'successfully fetched all posts',
      posts,
    });
  } catch (error) {
    console.log('error in fetching post', error);
    return res.status(500).json({
      message: 'can not fetch all posts',
    });
  }
});

module.exports = routes;
