/* eslint-disable prettier/prettier */
const express = require('express');
const User = require('../models/User');

const routes = express.Router();

routes.get('/:userId', async function (req, res) {
  try {
    const loggedInUserId = req.params.userId;
    console.log('received userId', loggedInUserId);

    const users = await User.find({
      _id: {$ne: loggedInUserId},
    });

    return res.status(200).json({
      message: `${users.length} users found`,
      users,
    });
  } catch (error) {
    console.log('error fetching users backend', error);
    return res.status(500).json({
      message: 'error fetching users backend',
    });
  }
});

routes.post('/follow', async function (req, res) {
  try {
    const {currentUserId, selectedUserId} = req.body;
    console.log(
      'received ids for follow req curr, selected',
      currentUserId,
      selectedUserId,
    );

    await User.findByIdAndUpdate(selectedUserId, {
      $push: {
        followers: currentUserId,
      },
    });

    return res.status(200).json({
      message: 'now following successfully',
    });
  } catch (error) {
    console.log('error follow request', error);
    return res.status(500).json({
      message: 'error follow request',
    });
  }
});

routes.post('/unfollow', async function (req, res) {
  try {
    const {loggedInUserId, targetUserId} = req.body;
    console.log(
      'received ids for un-follow req loggedin, target',
      loggedInUserId,
      targetUserId,
    );

    await User.findByIdAndUpdate(targetUserId, {
      $pull: {
        followers: loggedInUserId,
      },
    });

    return res.status(200).json({
      message: 'now un-following successfully',
    });
  } catch (error) {
    console.log('error un-follow request', error);
    return res.status(500).json({
      message: 'error un-follow request',
    });
  }
});

routes.get('/profile/:userId', async function (req, res) {
  try {
    const {userId} = req.params;
    console.log('received userId for profile', userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }

    return res.status(200).json({
      message: 'user found successfully',
      user,
    });
  } catch (error) {
    console.log('error fetching profile details', error);
    return res.status(500).json({
      message: 'error getting profile details',
    });
  }
});

module.exports = routes;
