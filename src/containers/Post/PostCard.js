import React from 'react';
import PostComment from './PostComment';

function PostCard(props) {
  const { id, title, body, comments = [], onViewPost, onDeletePost, isDeleting, isSingleView } = props;
  return <div className="card">
    <div className="content">
      <div className="header">
        { title }
      </div>
      <div className="description">
        { body }
      </div>
    </div>
    {
      comments.length ? <div className="extra content">
        <div className="ui two cards centered">
          { comments.map(comment => <PostComment {...comment} />) }
        </div>
      </div> : undefined
    }
    <div className="extra content">
      <div className="ui right floated" style={{ width: '50%' }}>
        <div className="ui two buttons">
          { !isSingleView && <div className="ui basic green button" onClick={() => onViewPost(id)}>View</div> }
          <div className={`ui basic red button ${isDeleting ? 'loading' : ''}`} onClick={() => onDeletePost(id)}>Delete</div>
        </div>
      </div>
    </div>
  </div>
}

export default PostCard;
