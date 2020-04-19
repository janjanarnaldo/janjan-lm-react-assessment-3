import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import MemberCard from './MemberCard';
import { Actions as userActions } from '../../actions/users';
import * as userSelectors from '../../selectors/users';
import { toMemberPost } from '../../utils/pathHelper';

function Member(props) {
  const { getUsers, setUser, users } = props;
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onViewPosts = memberId => {
    setUser(users.find(user => user.id === memberId));
    history.push(toMemberPost({ memberId }));
  }

  return <div className="ui">
    <h2 className="ui header centered">Members</h2>

    <div className="ui special cards centered">
      {
        users.map(({ id, name, companyName, avatar }) =>
        <MemberCard key={id} id={id} name={name} companyName={companyName} avatar={avatar} onViewPosts={onViewPosts} />)
      }
    </div>
  </div>
}

const mapStateToProps = state => ({
  users: userSelectors.users(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: userActions.getUsers,
  setUser: userActions.setUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Member);
