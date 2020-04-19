import { createAction, createFnAction } from './actionHelper';
import jsonPlaceholder from '../api/jsonPlaceholder';
import * as builder from './builder/usersBuilder';

export const GET_USERS = '[users] get users';
export const GET_USER = '[user] get user';
export const SET_USER = '[user] set user';

export const Actions = {
  getUsers: () => createFnAction(GET_USERS, async () => {
    const response = await jsonPlaceholder.get('/users');
    return response.data.map(builder.userBuilderForUI);
  }),
  getUser: userId => createFnAction(GET_USER, async () => {
    const response = await jsonPlaceholder.get(`/users/${userId}`);
    return builder.userBuilderForUI(response.data);
  }),
  setUser: user => createAction(SET_USER, user),
}
