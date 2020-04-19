import React from 'react';

function PostComment(props) {
  const { name, email, body } = props;

  return <div class="card">
    <div class="content">
      <div class="header">{name}</div>
      <div class="meta">{email}</div>
      <div class="description">
        {body}
      </div>
    </div>
  </div>
}

export default PostComment;
