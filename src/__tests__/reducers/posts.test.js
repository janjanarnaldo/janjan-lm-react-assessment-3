import reducer from '../../reducers/posts'
import {
  SET_FETCHING,
  GET_POSTS_BY_USER_ID,
} from '../../actions/posts'

const initialState = {
  fetching: false,
  posts: [],
  deletingPostQueue: [],
  selectedPost: {},
  selectedPostComments: [],
  savingPost: false,
}

describe('posts reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('should handle SET_FETCHING', () => {
    expect(
      reducer(initialState, {
        type: SET_FETCHING,
        payload: true
      })
    ).toEqual({
      ...initialState,
      fetching: true,
    })

    expect(
      reducer(initialState, {
        type: SET_FETCHING,
        payload: false
      })
    ).toEqual({
      ...initialState,
      fetching: false,
    })
  })

  test('should handle GET_POSTS_BY_USER_ID', () => {
    expect(
      reducer(initialState, {
        type: GET_POSTS_BY_USER_ID,
        payload: [{ id: 100 }, { id: 300 }]
      })
    ).toEqual({
      ...initialState,
      posts: [{ id: 100 }, { id: 300 }],
    })
  })
})