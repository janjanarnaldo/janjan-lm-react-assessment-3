import { SET_FETCHING, GET_USERS, GET_USER, SET_USER } from '../actions/users';

const initialState = {
  fetching: false,
  users: [],
  selectedUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING: {
      return { ...state, fetching: action.payload };
    }
    case GET_USERS: {
      return { ...state, users: [ ...action.payload ] };
    }
    case GET_USER:
    case SET_USER: {
      return { ...state, selectedUser: { ...action.payload } };
    }
    default:
      return state;
  }
}
