import React from 'react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store'
import { render } from '../../utils/testUtil';
import userEvent from '@testing-library/user-event';
import MemberList from '../../containers/Member/MemberList';
import reducer from '../../reducers/users'
import {
  GET_USERS,
  SET_USER,
  Actions as userActions,
} from '../../actions/users';

jest.mock('../../actions/users');

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
const mockStore = configureMockStore([])

describe('<MemberList />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    userActions.getUsers.mockImplementation(() => ({ type: GET_USERS }))
    userActions.setUser.mockImplementation(() => ({ type: SET_USER }))
  });

  test('Rendering of correct elements', () => {
    const props = {
      users: [],
      fetching: false,
    }
    const { queryByText } = render(
      <MemberList />,
      {
        initialState: { users: props },
        reducer,
        store: mockStore({
          users: props,
        }),
      }
    );
    expect(queryByText(/members/i)).toBeInTheDocument();
    expect(userActions.getUsers).toHaveBeenCalled();
  })

  test('That it renders 3 placeholder loader when loading', () => {
    const props = {
      users: [],
      fetching: true,
    }
    const { getAllByAltText } = render(
      <MemberList />,
      {
        initialState: props,
        reducer,
        store: mockStore({
          users: props,
        }),
      },
    );
    expect(getAllByAltText('loader').length).toEqual(3);
  });

  test('That it renders 2 users', () => {
    const props = {
      users: [
        {
          id: 100,
          name: 'User 1',
          companyName: 'Toyota',
          avatar: 'random',
        },
        {
          id: 101,
          name: 'User 2',
          companyName: 'Toyota',
          avatar: 'random',
        },
      ],
      fetching: false,
    }
    const { queryByAltText } = render(
      <MemberList />,
      {
        initialState: props,
        reducer,
        store: mockStore({
          users: props,
        }),
      }
    );
    expect(queryByAltText('User 1')).toBeInTheDocument();
    expect(queryByAltText('User 2')).toBeInTheDocument();
    expect(queryByAltText('User 3')).not.toBeInTheDocument();
  });

  test('That it sets user and updates history when clicked', () => {
    const props = {
      users: [
        {
          id: 100,
          name: 'User 1',
          companyName: 'Toyota',
          avatar: 'random',
        },
      ],
      fetching: false,
    }

    const { getByTestId } = render(
      <MemberList />,
      {
        initialState: props,
        reducer,
        store: mockStore({
          users: props,
        }),
      }
    );
    const memberViewButton = getByTestId('view-100');

    userEvent.click(memberViewButton);
    expect(userActions.setUser).toHaveBeenCalledWith(props.users[0]);
    expect(mockHistoryPush).toHaveBeenCalledWith('/member/100/post');
  });
})