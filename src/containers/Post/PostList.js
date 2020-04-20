import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams, useHistory } from 'react-router-dom';

import PostCard from './PostCard';
import BreadCrumb from '../../components/BreadCrumb';

import { toMemberPost, toAddPost } from '../../utils/pathHelper';
import { Actions as userActions } from '../../actions/users';
import { Actions as postActions } from '../../actions/posts';
import * as userSelectors from '../../selectors/users';
import * as postSelectors from '../../selectors/posts';

function Post(props) {
  const { getUser, user, fetching, getPostsByUserId, posts, deletePost, deletingPostQueue } = props;
  const { memberId } = useParams();
  const history = useHistory();

  useEffect(() => {
    !user.id && getUser(memberId);
  }, [getUser, memberId, user]);

  useEffect(() => {
    getPostsByUserId(memberId);
  }, [getPostsByUserId, memberId]);

  const onAddPost = () => history.push(toAddPost(memberId));
  const onViewPost = postId => history.push(toMemberPost({ memberId, postId }));
  const onDeletePost = postId => deletePost(postId);

  const renderResults = () => {
    return posts.map(({ id, title, body }) =>
    <PostCard key={id} id={id} title={title} body={body} onViewPost={onViewPost} onDeletePost={onDeletePost} isDeleting={deletingPostQueue.includes(id)} />)
  }
  const renderPlaceholder = () => {
    return [0, 1, 2].map(v => <PostCard key={`loader-${v}`} isPlaceholder />);
  }

  const navigations = [{ title: 'Members', url: '/' }];

  return <div className="ui">
    <BreadCrumb navigations={navigations}>
      <div className="active section">{user.name} Posts</div>
      <button className="positive ui button" style={{ marginLeft: '1rem' }} onClick={onAddPost}>Add Post</button>
    </BreadCrumb>

    <div className="ui one cards centered">
      { fetching ? renderPlaceholder() : renderResults() }
    </div>
  </div>
}

const mapStateToProps = state => ({
  user: userSelectors.selectedUser(state),
  fetching: postSelectors.fetching(state),
  posts: postSelectors.posts(state),
  deletingPostQueue: postSelectors.deletingPostQueue(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: userActions.getUser,
  getPostsByUserId: postActions.getPostsByUserId,
  deletePost: postActions.deletePost,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post);
