
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  SET_FETCHING,
  GET_POSTS_BY_USER_ID,
  Actions,
} from '../../actions/posts'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../api/jsonPlaceholder', () => ({
  interceptors: {
    request: {
      use: jest.fn(),
    }
  },
  get: jest.fn(() => Promise.resolve([])),
}));

describe('post actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('sets SET_FETCHING true then false when fetching has been done', () => {
    const expectedActions = [
      { type: SET_FETCHING, payload: true },
      { type: SET_FETCHING, payload: false },
      { type: GET_POSTS_BY_USER_ID },
    ];

    const store = mockStore({ posts: [] })

    return store.dispatch(Actions.getPostsByUserId(100)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})