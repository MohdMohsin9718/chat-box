const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');

// @desc    Get comments
// @route   GET /api/comments
// @access  Public
const getComment = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

// @desc    Post comments
// @route   Post /api/comments
// @access  Private
const postComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const post = await Post.create({
    text: req.body.text,
  });

  res.status(200).json(post);
});

// @desc    Update comments
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const UpdatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(UpdatedPost);
});

// @desc    Delete comments
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
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
