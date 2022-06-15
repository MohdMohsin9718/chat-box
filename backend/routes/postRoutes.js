const express = require('express');
const {
  getComment,
  postComment,
  updateComment,
  deleteComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getComment).post(protect, postComment);
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment);

module.exports = router;
