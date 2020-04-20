import { AVATARS } from '../constants/avatars';

export const randomAvatar = () => {
  const randomKey = Math.floor(Math.random() * AVATARS.length);
  return AVATARS[randomKey];
}
