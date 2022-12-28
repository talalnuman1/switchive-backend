const allRoles = {
  user: ['cart', 'order', 'coinremitter', 'getswitchiveGiftCard'],
  admin: ['getUsers', 'manageUsers', 'cart', 'order', 'switchiveGiftCard', 'formula', 'getswitchiveGiftCard'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
