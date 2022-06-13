const asyncHandler = require('express-async-handler');

// @desc    Get comments
// @route   GET /api/comments
// @access  Public
const getComment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get comments' });
});

// @desc    Post comments
// @route   Post /api/comments
// @access  Private
const postComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  res.status(200).json({ message: 'Posted comment' });
});

// @desc    Update comments
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated comment ${req.params.id}` });
});

// @desc    Delete comments
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted comment ${req.params.id}` });
});

module.exports = {
  getComment,
  postComment,
  updateComment,
  deleteComment,
};
