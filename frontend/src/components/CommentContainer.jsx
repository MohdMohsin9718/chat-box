import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteComment,
  likeComment,
  unlikeComment,
} from '../features/posts/postSlice';

const CommentContainer = ({ comment, postId }) => {
  const dispatch = useDispatch();

  const data = {
    postId,
    commentId: comment._id,
  };

  // const delCom = () => {
  //   const data = {
  //     postId,
  //     commentId: comment._id,
  //   };
  //   dispatch(deleteComment(data));
  // };

  const { user } = useSelector(state => state.auth);
  return (
    <div className='container'>
      <div className='post'>
        <div className='likesCounter'>
          <FaPlus onClick={() => dispatch(likeComment(data))} />
          {comment.likes.length}
          <FaMinus onClick={() => dispatch(unlikeComment(data))} />
        </div>
        <div>
          <div className='detail'>
            <div className='name'>{comment.name}</div>
            <div className='date'>
              {new Date(comment.date).toLocaleString('en-US')}
            </div>
          </div>
          <p>{comment.text}</p>
        </div>
        {user && user._id === comment.user ? (
          <button
            onClick={() => dispatch(deleteComment(data))}
            className='close'
          >
            <FaTrash />
            <b> Delete</b>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
