import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useParams, useHistory } from 'react-router-dom';

import PostCard from './PostCard';

import { toMemberPost } from '../../utils/pathHelper';
import { Actions as userActions } from '../../actions/users';
import { Actions as postActions } from '../../actions/posts';
import * as userSelectors from '../../selectors/users';
import * as postSelectors from '../../selectors/posts';

function Post(props) {
  const { getUser, user, getPostsByUserId, posts, deletePost, deletingPostQueue } = props;
  const { memberId } = useParams();
  const history = useHistory();

  useEffect(() => {
    !user.id && getUser(memberId);
  }, [getUser, memberId, user]);

  useEffect(() => {
    getPostsByUserId(memberId);
  }, [getPostsByUserId, memberId]);

  const onViewPost = postId => history.push(toMemberPost({ memberId, postId }));
  const onDeletePost = postId => deletePost(postId);

  return <div className="ui">
    <div className="ui header">
      <div className="ui breadcrumb">
        <Link className="section" to="/">Members</Link>
        <i className="right angle icon divider"></i>
        <div className="active section">{user.name} Posts</div>
        <button className="positive ui button" style={{ marginLeft: '1rem' }}>Add Post</button>
      </div>
    </div>

    <div className="ui one cards centered">
      {
        posts.map(({ id, title, body }) =>
        <PostCard key={id} id={id} title={title} body={body} onViewPost={onViewPost} onDeletePost={onDeletePost} isDeleting={deletingPostQueue.includes(id)} />)
      }
    </div>
  </div>
}

const mapStateToProps = state => ({
  user: userSelectors.selectedUser(state),
  posts: postSelectors.posts(state),
  deletingPostQueue: postSelectors.deletingPostQueue(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: userActions.getUser,
  getPostsByUserId: postActions.getPostsByUserId,
  deletePost: postActions.deletePost,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post);
