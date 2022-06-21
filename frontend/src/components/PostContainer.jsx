import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../features/posts/postSlice';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect } from 'react';
import Spinner from './Spinner';

const PostContainer = ({ post }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { isError, isLoading, message } = useSelector(state => state.posts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
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
  );
};

export default PostContainer;
