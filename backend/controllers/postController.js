const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');
const User = require('../models/userModel');

// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getComment = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

// @desc    Post post
// @route   Post /api/posts
// @access  Private
const postComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Make sure logged user matches the post user
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const UpdatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(UpdatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Make sure logged user matches the post user
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getComment,
  postComment,
  updateComment,
  deleteComment,
};
