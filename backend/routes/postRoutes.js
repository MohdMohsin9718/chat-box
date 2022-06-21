const express = require('express');
const {
  getPost,
  uploadPost,
  updatepost,
  deletePost,
  likePost,
  unlikePost,
  uploadComment,
  deleteComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getPost).post(protect, uploadPost);
router.route('/:id').put(protect, updatepost).delete(protect, deletePost);
router.route('/like/:id').put(protect, likePost).delete(protect, unlikePost);
router.route('/comment/:id').put(protect, uploadComment);
router.route('/comment/:id/:commentId').delete(protect, deleteComment);

module.exports = router;
