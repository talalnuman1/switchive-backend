const allRoles = {
  user: ['cart', 'order', 'coinremitter'],
  admin: ['getUsers', 'manageUsers', 'cart', 'order', 'switchiveGiftCard', 'formula'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
