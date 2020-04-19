import { GET_USERS } from '../actions/users';

const initialState = [{ name: 'Mark' }];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...action.payload };
    }
    default:
      return state;
  }
}
