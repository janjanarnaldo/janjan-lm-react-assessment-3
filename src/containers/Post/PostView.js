import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import PostCard from './PostCard';

import { usePrevious } from '../../hooks';
import { toMemberPost } from '../../utils/pathHelper';
import { Actions as userActions } from '../../actions/users';
import { Actions as postActions } from '../../actions/posts';
import * as userSelectors from '../../selectors/users';
import * as postSelectors from '../../selectors/posts';

function PostView(props) {
  const { fetching, user, getUser, post, getPostById, deletePost, comments, getPostComments, clearPost, deletingPostQueue } = props;
  const { title, body } = post;
  const { memberId, postId } = useParams();
  const prevPost = usePrevious(post);
  const history = useHistory();

  useEffect(() => {
    !user.id && getUser(memberId);
  }, [getUser, memberId, user]);

  useEffect(() => {
    const prev = prevPost || {};
    if (!post.id && !prev.id) getPostById(postId);
    else if (!post.id && !!prev.id) {
      alert('Post Successfully Deleted!');
      history.push(toMemberPost({ memberId }));
    }
  }, [getPostById, postId, post, prevPost, history, memberId]);

  useEffect(() => {
    getPostComments(postId);
  }, [getPostComments, postId]);

  useEffect(() => {
    return () => clearPost();
  }, [clearPost]);

  const onDeletePost = id => deletePost(id);

  const renderResults = () => {
    return post.id &&
    <PostCard isSingleView id={postId} title={title} body={body} comments={comments} onDeletePost={onDeletePost} isDeleting={deletingPostQueue.includes(postId)}/>
  }

  const renderPlaceholder = () => <PostCard isPlaceholder />;

  return <div className="ui">
    <div className="ui header">
      <div className="ui breadcrumb">
        <Link className="section" to="/">Members</Link>
        <i className="right angle icon divider"></i>
        <Link className="section" to={toMemberPost({ memberId })}>{user.name}</Link>
        <i className="right angle icon divider"></i>
        <div className="active section">Comments</div>
      </div>
    </div>

    <div className="ui one cards centered">
      { fetching ? renderPlaceholder() : renderResults() }
    </div>
  </div>
}

const mapStateToProps = state => ({
  user: userSelectors.selectedUser(state),
  post: postSelectors.selectedPost(state),
  deletingPostQueue: postSelectors.deletingPostQueue(state),
  comments: postSelectors.selectedPostComments(state),
  fetching: postSelectors.fetching(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: userActions.getUser,
  getPostById: postActions.getPostById,
  getPostComments: postActions.getPostComments,
  deletePost: postActions.deletePost,
  clearPost: postActions.clearPost,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostView);

