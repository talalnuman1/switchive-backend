const allRoles = {
  user: ['cart', 'order', 'coinremitter', 'getswitchiveGiftCard', 'wishList'],
  blogWriter: ['Blog'],
  admin: [
    'getUsers',
    'manageUsers',
    'cart',
    'order',
    'switchiveGiftCard',
    'formula',
    'getswitchiveGiftCard',
    'Blog',
    'wishList',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
