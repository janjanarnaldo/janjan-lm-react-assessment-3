import React, { Fragment } from 'react';
import PostComment from './PostComment';
import { DEFAULT_DECRIPTION } from '../../constants/avatars';

function PostCard(props) {
  const { id, title, body, comments = [], onViewPost, onDeletePost, isDeleting, isSingleView, isPlaceholder } = props;
  return <div className="card">
    <div className="content">
      {
        isPlaceholder ? <div className="description">
          <img src={DEFAULT_DECRIPTION} alt="loader" className="ui wireframe image" />
        </div> : <Fragment>
          <div className="header">
            { title }
          </div>
          <div className="description">
            { body }
          </div>
        </Fragment>
      }
    </div>
    {
      !isPlaceholder && !!comments.length ? <div className="extra content">
        <div className="ui two cards centered">
          { comments.map(comment => <PostComment {...comment} />) }
        </div>
      </div> : undefined
    }
    {
      !isPlaceholder && <div className="extra content">
        <div className="ui right floated" style={{ width: '50%' }}>
          <div className="ui two buttons">
            { !isSingleView && <div className="ui basic green button" onClick={() => onViewPost(id)}>View</div> }
            <div className={`ui basic red button ${isDeleting ? 'disabled loading' : ''}`} onClick={() => onDeletePost(id)}>Delete</div>
          </div>
        </div>
      </div>
    }
  </div>
}

export default PostCard;
