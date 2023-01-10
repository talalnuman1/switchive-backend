const allRoles = {
  user: ['cart', 'order', 'coinremitter', 'getswitchiveGiftCard', 'wishList', 'Wallet', 'Redeem'],
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
    'Wallet',
    'Redeem',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
