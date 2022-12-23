const allRoles = {
  user: ['cart', 'order','coinremitter'],
  admin: ['getUsers', 'manageUsers', 'cart', 'order', 'switchiveGiftCard'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
