import React, { useEffect }  from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { usePrevious } from '../../hooks';
import { toMemberPost } from '../../utils/pathHelper';
import { Actions as userActions } from '../../actions/users';
import { Actions as postActions } from '../../actions/posts';
import * as userSelectors from '../../selectors/users';
import * as postSelectors from '../../selectors/posts';

function PostNew(props) {
  const { user, getUser, error, handleSubmit, saveNewPost, savingPost } = props;
  const prevSavingPost = usePrevious(savingPost);
  const { memberId } = useParams();
  const history = useHistory();

  useEffect(() => {
    !user.id && getUser(memberId);
  }, [getUser, memberId, user]);

  useEffect(() => {
    if (!savingPost && !!prevSavingPost) {
      alert('Post Successfully Saved!');
      history.push(toMemberPost({ memberId }));
    }
  }, [savingPost, prevSavingPost, history, memberId]);

  const onSubmit = values => {
    const { title, body } = values;
    if (!!title && !!body) saveNewPost(memberId, values);
  }

  const renderField = ({ label, meta }, Component) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        { Component }
      </div>
    )
  }

  const renderInput = ({ input, label, type, meta }) => {
    return renderField(
      { input, label, type, meta },
      <input {...input} type={type} autoComplete="off"/>
    );
  }
  const renderTextArea = ({ input, label, type, meta }) => {
    return renderField(
      { input, label, type, meta },
      <textarea {...input} row="2" _vkenabled="true" autoComplete="off"/>
    );
  }

  return <div className="ui">
    <div className="ui header">
      <div className="ui breadcrumb">
        <Link className="section" to="/">Members</Link>
        <i className="right angle icon divider"></i>
        <Link className="section" to={toMemberPost({ memberId })}>{user.name} Posts</Link>
        <div className="active section"></div>
        <i className="right angle icon divider"></i>
        <div className="active section">New Post</div>
      </div>
    </div>

    <form className={`ui form ${error ? 'error' : ''}`} onSubmit={handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} type="text" label="Title" />
      <Field name="body" component={renderTextArea} type="textarea" label="Body" />
      <button className={`ui button primary ${savingPost ? 'disabled loading' : ''}`} type="submit">Submit</button>
    </form>
  </div>
}

const mapStateToProps = state => ({
  user: userSelectors.selectedUser(state),
  savingPost: postSelectors.savingPost(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: userActions.getUser,
  saveNewPost: postActions.saveNewPost,
//   getPostById: postActions.getPostById,
//   getPostComments: postActions.getPostComments,
//   deletePost: postActions.deletePost,
//   clearPost: postActions.clearPost,
}, dispatch);

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'You must enter a title';
  if (!values.body) errors.body = 'You must enter a body';

  return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'post', validate })(PostNew));
