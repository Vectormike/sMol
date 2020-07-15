const roles = ['user', 'admin', 'vendor'];

const roleRights = new Map();
roleRights.set(roles[0], ['user', 'admin', 'vendor']);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
