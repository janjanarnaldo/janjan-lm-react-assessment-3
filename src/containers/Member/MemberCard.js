import React, { useState } from 'react';

const initialHoverState = {
  dimmableDivClass: 'blurring dimmable image',
  dimmerDivClass: 'ui dimmer transition hidden',
  dimmerDivStyle: {},
}

const dimmedHoverState = {
  dimmableDivClass: 'blurring dimmable image dimmed',
  dimmerDivClass: 'ui dimmer transition visible active',
}

export default function MemberCard(props) {
  const { id, name, companyName, onViewPosts, avatar } = props;
  const [hoverStyle, setHoverStyle] = useState(initialHoverState);

  const toggleHover = (isHover) => () => {
    setHoverStyle(isHover ? dimmedHoverState : initialHoverState);
  }

  return <div className="fluid card">
    <div className={hoverStyle.dimmableDivClass} onMouseEnter={toggleHover(true)} onMouseLeave={toggleHover(false)}>
      <div
        className={hoverStyle.dimmerDivClass}
        // This is a dirty hack
        // Semantic UI needs !important
        // Issue on specifity and React not accepting !important in styled components
        ref={(el) => { if (el) el.style.setProperty('display', 'flex', 'important') }}
      >
        <div className="content">
          <div className="center">
            <div className="ui inverted button" onClick={() => onViewPosts(id)}>View Posts</div>
          </div>
        </div>
      </div>
      <img src={avatar} alt={name} />
    </div>
    <div className="content">
      <span className="header">{name}</span>
      <div className="meta">
        <span className="date">{companyName}</span>
      </div>
    </div>
  </div>
}
