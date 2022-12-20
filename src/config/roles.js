const allRoles = {
  user: ['cart', 'order'],
  admin: ['getUsers', 'manageUsers', 'cart', 'order'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
