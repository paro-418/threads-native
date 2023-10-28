/* eslint-disable prettier/prettier */
const express = require('express');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const routes = express.Router();
const generateSecretKey = () => crypto.randomBytes(32).toString('hex');

const secretKey = generateSecretKey();

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // compose  the email
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email http://localhost:8000/auth/verify/${verificationToken}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('error sending verification email', error);
  }
};

routes.post('/register', async function (req, res) {
  try {
    const {name, email, password} = req.body;
    console.log('register credentials received', name, email, password);

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(403).json({
        message: 'User already found with this mail',
      });
    }

    // create new user

    const newUser = await User({
      name,
      email,
      password,
    });

    // generate and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    //save user to the backend
    await newUser.save();

    // send the verification email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    const token = await jwt.sign({userId: newUser._id}, secretKey);
    return res.status(200).json({
      message: 'Registration successful',
      token,
    });
  } catch (error) {
    console.log('error registering backend', error);
    return res.status(500).json({
      message: 'error registering user',
    });
  }
});

routes.post('/login', async function (req, res) {
  try {
    const {email, password} = req.body;
    console.log('login credentials received', email, password);

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: 'No user found',
      });
    }

    // check password
    if (user.password !== password) {
      return res.status(404).json({
        message: 'Invalid credentials',
      });
    }
    const token = jwt.sign({userId: user._id}, secretKey);

    return res.status(200).json({
      message: 'login successful',
      token,
    });
  } catch (error) {
    console.log('error logging user backend', error);
    return res.status(500).json({
      message: 'error logging user backend',
    });
  }
});

routes.get('/verify/:token', async function (req, res) {
  try {
    const {token} = req.params;
    console.log('token received to verify', token);
    const user = await User.findOne({verificationToken: token});
    console.log('user verify function', user);

    if (!user) {
      return res.status(404).json({
        message: 'Invalid Token',
      });
    }

    // verifying user
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({
      message: 'user verified successfully',
    });
  } catch (error) {
    console.log('error verifying user', error);
    return res.status(500).json({
      message: 'error verifying user',
    });
  }
});

module.exports = routes;
