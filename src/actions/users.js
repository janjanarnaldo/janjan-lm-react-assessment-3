import { createFnAction } from './actionHelper';
import jsonPlaceholder from '../api/jsonPlaceholder';
import * as builder from './lib/usersBuilder';

export const GET_USERS = '[users] get users';
export const SET_USERS = '[users] set users';

export const Actions = {
  getUsers: () => createFnAction(GET_USERS, async () => {
    const response = await jsonPlaceholder.get('/users');
    return response.data.map(builder.userBuilderForUI);
  }),
}
