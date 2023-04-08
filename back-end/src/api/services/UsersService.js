const md5 = require('md5');
const { User } = require('../../database/models');

const usersGetService = async () => {
  const allProducts = await User.findAll({ where: { role: 'seller' } });
  console.log(allProducts);
  return allProducts;
};

const userGetService = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const userGetById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const allUsersService = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

const registerAdminService = async (user) => {
  const { name, email, password, role } = user;
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return false;
  const result = await User.create({ name, email, password, role });
  return result;
};

const usersUpdatePasswordService = async (id, user) => {
  const { password, newPassword } = user;
  const encryptedPassword = md5(password);
  if (password === newPassword) {
    return { error: true, message: 'Password tem de ser diferente da anteriror' };
  }
  const getUser = await User.findOne({ where: { id, password: encryptedPassword } });
  if (!getUser) return { error: true, message: 'Password errada.' };
  const updatedUser = await User.update({ password: md5(newPassword) }, { where: { id } });
  return updatedUser;
};

const usersUpdateAddressService = async (id, user) => {
  try {
    const { address, door } = user;
    const getUser = await User.findOne({ where: { id } });
    if (!getUser) return { error: true, message: 'Usuário não encontrado.' };
    const updatedUser = await User.update({ address, door }, { where: { id } });
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};

const usersDeleteService = async (id) => {
  const result = await User.destroy({ where: { id } });
  return result;
};

module.exports = {
  usersGetService,
  userGetService,
  userGetById,
  allUsersService,
  registerAdminService,
  usersUpdatePasswordService,
  usersUpdateAddressService,
  usersDeleteService,
};