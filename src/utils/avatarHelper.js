import { AVATARS } from '../constants/avatars';

export const randomAvatar = () => {
  const randomKey = Math.floor(Math.random() * 7);
  return AVATARS[randomKey];
}
