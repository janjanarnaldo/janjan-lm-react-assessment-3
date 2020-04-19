import {
  MEMBER_PATH,
  POST_PATH,
} from '../routes';

export const toMemberPost = ({ memberId, postId }) => {
  return `${MEMBER_PATH}/${memberId}${POST_PATH}${postId ? `/${postId}` : ''}`
}
