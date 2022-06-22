import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  likePost,
  unlikePost,
  uploadComment,
} from '../features/posts/postSlice';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect } from 'react';
import CommentContainer from './CommentContainer';
import { useState } from 'react';

const PostContainer = ({ post }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { isError, message } = useSelector(state => state.posts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message, post]);

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      id: post._id,
      data: {
        text,
      },
    };
    dispatch(uploadComment(data));
    setText('');
  };

  return (
    <div className='container'>
      <div className='post'>
        <div className='likesCounter'>
          <FaPlus onClick={() => dispatch(likePost(post._id))} />
          {post.likes.length}
          <FaMinus onClick={() => dispatch(unlikePost(post._id))} />
        </div>
        <div>
          <div className='detail'>
            <div className='name'>{post.name}</div>
            <div className='date'>
              {new Date(post.createdAt).toLocaleString('en-US')}
            </div>
          </div>
          <p>{post.text}</p>
        </div>
        {user && user._id === post.user ? (
          <button
            onClick={() => dispatch(deletePost(post._id))}
            className='close'
          >
            <FaTrash />
            <b> Delete</b>
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentContainer
            key={comment._id}
            comment={comment}
            postId={post._id}
          />
        ))}
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                name='text'
                value={text}
                id='text'
                onChange={e => setText((e.target.name = e.target.value))}
              />
              <button className='btn btn-block' type='submit'>
                Reply
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PostContainer;
