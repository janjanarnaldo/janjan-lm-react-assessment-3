import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Error from '../containers/Error';
import MemberContainer from '../containers/Member';
import PostContainer from '../containers/Post';

export const ERROR_PATH = '/error';
export const MEMBER_PATH = '/member';
export const MEMBER_POST_PATH = '/member/post';

export default () => {
  return (
    <div className="ui segment container">
      <Switch>
        <Route path='/' exact component={() => <Redirect to={MEMBER_PATH}/>}/>
        <Route path={MEMBER_POST_PATH} component={PostContainer}/>
        <Route path={MEMBER_PATH} component={MemberContainer}/>

        <Route path={ERROR_PATH} component={Error}/>
        <Route component={Error}/>
      </Switch>
    </div>
  )
}
