import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Error from '../containers/Error';
import MemberList from '../containers/Member/MemberList';
import PostList from '../containers/Post/PostList';
import PostNew from '../containers/Post/PostNew';
import PostView from '../containers/Post/PostView';

export const ERROR_PATH = '/error';
export const MEMBER_PATH = '/member';
export const POST_PATH = '/post';

export default () => {
  return (
    <div className="ui segment container">
      <Switch>
        <Route path='/' exact component={() => <Redirect to={MEMBER_PATH}/>}/>
        <Route path={`${MEMBER_PATH}/:memberId${POST_PATH}/new`} component={PostNew}/>
        <Route path={`${MEMBER_PATH}/:memberId${POST_PATH}/:postId`} component={PostView}/>
        <Route path={`${MEMBER_PATH}/:memberId${POST_PATH}`} component={PostList}/>
        <Route path={MEMBER_PATH} component={MemberList}/>

        <Route path={ERROR_PATH} component={Error}/>
        <Route component={Error}/>
      </Switch>
    </div>
  )
}
