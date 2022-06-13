const express = require('express');
const {
  getComment,
  postComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const router = express.Router();

router.route('/').get(getComment).post(postComment);
router.route('/:id').put(updateComment).delete(deleteComment);

module.exports = router;
