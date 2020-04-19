import { randomAvatar } from '../../utils/avatarHelper';

export const userBuilderForUI = data => ({
  id: data.id,
  name: data.name,
  companyName: data.company.name,
  avatar: randomAvatar(),
});
