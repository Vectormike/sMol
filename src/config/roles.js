const roles = ['user', 'vendor', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['user']);
roleRights.set(roles[1], ['vendor']);

module.exports = {
  roles,
  roleRights,
};
