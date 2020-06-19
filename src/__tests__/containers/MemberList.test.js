import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { UnconnectedMember } from '../../containers/Member/MemberList';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
describe('<MemberList />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const commonProps = {
    getUsers: jest.fn(),
    setUser: jest.fn(),
  };

  test('Rendering of correct elements', () => {
    const props = {
      ...commonProps,
      users: [],
      fetching: false,
    }
    const { queryByText } = render(<UnconnectedMember {...props} />);
    expect(queryByText(/members/i)).toBeInTheDocument();
    expect(props.getUsers).toHaveBeenCalled();
  })

  test('That it renders 3 placeholder loader when loading', () => {
    const props = {
      ...commonProps,
      users: [],
      fetching: true,
    }
    const { getAllByAltText } = render(<UnconnectedMember {...props} />);
    expect(getAllByAltText('loader').length).toEqual(3);
  });

  test('That it renders 2 users', () => {
    const props = {
      ...commonProps,
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
    const { queryByAltText } = render(<UnconnectedMember {...props} />);
    expect(queryByAltText('User 1')).toBeInTheDocument();
    expect(queryByAltText('User 2')).toBeInTheDocument();
    expect(queryByAltText('User 3')).not.toBeInTheDocument();
  });

  test('That it sets user and updates history when clicked', () => {
    const props = {
      ...commonProps,
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

    const { getByTestId } = render(<UnconnectedMember {...props} />);
    const memberViewButton = getByTestId('view-100');

    userEvent.click(memberViewButton);
    expect(props.setUser).toHaveBeenCalledWith(props.users[0]);
    expect(mockHistoryPush).toHaveBeenCalledWith('/member/100/post');
  });
});
