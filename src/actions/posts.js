import { createAction, createFnAction } from './actionHelper';
import jsonPlaceholder from '../api/jsonPlaceholder';

export const SET_FETCHING = '[posts] set fetching';
export const GET_POSTS_BY_USER_ID = '[posts] get posts by user id';
export const SET_POST = '[posts] set post';
export const GET_POST_BY_ID = '[posts] get post by id';
export const GET_POST_COMMENTS = '[posts] get post comments';
export const DELETE_POST = '[posts] delete post';
export const SET_DELETE_POST_QUEUE = '[posts] set delete post queue';
export const REMOVE_DELETE_POST_QUEUE = '[posts] remove delete post queue';
export const CLEAR_SELECTED_POST = '[posts] clear selected post';
export const SET_SAVING_POST = '[posts] set saving post';
export const SAVE_NEW_POST = '[posts] save new post';

export const Actions = {
  getPostsByUserId: userId => createFnAction(GET_POSTS_BY_USER_ID, async dispatch => {
    dispatch(createAction(SET_FETCHING, true));
    const response = await jsonPlaceholder.get(`/posts?userId=${userId}`);
    dispatch(createAction(SET_FETCHING, false));
    return response.data;
  }),
  setPost: post => createAction(SET_POST, post),
  getPostById: postId => createFnAction(GET_POST_BY_ID, async () => {
    const response = await jsonPlaceholder.get(`/posts/${postId}`);
    return response.data;
  }),
  getPostComments: postId => createFnAction(GET_POST_COMMENTS, async dispatch => {
    dispatch(createAction(SET_FETCHING, true));
    const response = await jsonPlaceholder.get(`/posts/${postId}/comments`);
    dispatch(createAction(SET_FETCHING, false));
    return response.data;
  }),
  deletePost: postId => createFnAction(DELETE_POST, async dispatch => {
    dispatch(createAction(SET_DELETE_POST_QUEUE, postId));
    await jsonPlaceholder.delete(`/posts/${postId}`);
    dispatch(createAction(REMOVE_DELETE_POST_QUEUE, postId));
    dispatch(createAction(CLEAR_SELECTED_POST));
    return postId;
  }),
  clearPost: () => createAction(CLEAR_SELECTED_POST),
  saveNewPost: (userId, values = {}) => createFnAction(SAVE_NEW_POST, async dispatch => {
    dispatch(createAction(SET_SAVING_POST, true));
    const response = await jsonPlaceholder.post(`/posts`, { userId, ...values });
    dispatch(createAction(SET_SAVING_POST, false));
    return response.data;
  }),
}
