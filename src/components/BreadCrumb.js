import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function BreadCrumb({ navigations = [], children }) {
  return <div className="ui header">
    <div className="ui breadcrumb">
      {
        navigations.length ? navigations.map(({ title, url }) => <Fragment key={`nav-${title}`} >
          <Link className="section" to={url}>{title}</Link>
          <i className="right angle icon divider"></i>
        </Fragment>) : null
      }
      { children }
    </div>
  </div>
}

export default BreadCrumb;
