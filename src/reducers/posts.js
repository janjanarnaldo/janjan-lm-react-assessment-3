import {
  GET_POSTS_BY_USER_ID,
  SET_DELETE_POST_QUEUE,
  REMOVE_DELETE_POST_QUEUE,
  SET_POST,
  GET_POST_BY_ID,
  GET_POST_COMMENTS,
  CLEAR_SELECTED_POST,
} from '../actions/posts';

const initialState = {
  posts: [],
  deletingPostQueue: [],
  workingPost: {},
  selectedPost: {},
  selectedPostComments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_BY_USER_ID: {
      return { ...state, posts: [...action.payload] };
    }
    case GET_POST_BY_ID:
    case SET_POST: {
      return { ...state, selectedPost: { ...action.payload } };
    }
    case SET_DELETE_POST_QUEUE: {
      return { ...state, deletingPostQueue: [...state.deletingPostQueue, action.payload] };
    }
    case REMOVE_DELETE_POST_QUEUE: {
      return {
        ...state,
        deletingPostQueue: state.deletingPostQueue.filter(postId => postId !== action.payload),
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    }
    case GET_POST_COMMENTS: {
      return { ...state, selectedPostComments: [...action.payload] };
    }
    case CLEAR_SELECTED_POST: {
      return { ...state, selectedPost: {}, selectedPostComments: [] };
    }
    default:
      return state;
  }
}
