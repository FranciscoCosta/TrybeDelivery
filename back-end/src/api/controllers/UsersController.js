const md5 = require('md5');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');
const {
  usersGetService,
  userGetService,
  userGetById,
  allUsersService,
  registerAdminService,
  usersUpdatePasswordService,
  usersUpdateAddressService,
  usersDeleteService,
} = require('../services/UsersService');

const NOT_FOUND = 'User or Password not found';

const usersController = async (_req, res) => {
  const user = await usersGetService();
  if (!user) return res.status(404).json({ message: NOT_FOUND });
  return res.status(200).json(user);
};

const userGet = async (req, res) => {
  const { email } = req.body;
  console.log(req);
  const user = await userGetService(email);
  if (!user) return res.status(404).json({ message: NOT_FOUND });
  return res.status(200).json(user);
};

const userGetId = async (req, res) => {
  const { id } = req.body;
  console.log(req);
  const user = await userGetById(id);
  if (!user) return res.status(404).json({ message: NOT_FOUND });
  return res.status(200).json(user);
};

const allUsersController = async (_req, res) => {
  const users = await allUsersService();
  if (!users) return res.status(404).json({ message: NOT_FOUND });
  return res.status(200).json(users);
};

const registerAdminController = async (req, res) => {
  const token = req.headers.authorization;

  const verifyAdmin = await verifyTokenAdmin(token);
  if (verifyAdmin === false) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const encryptedPassword = md5(req.body.newUser.password);
  const user = {
    name: req.body.newUser.name,
    email: req.body.newUser.email,
    password: encryptedPassword,
    role: req.body.newUser.role,
  };
  console.log(user);
  const result = await registerAdminService(user);
  if (result === false) {
    return res.status(409).json({ message: 'User already exists' });
  }
  return res.status(201).json(result);
};

const usersUpdateController = async (req, res) => {
  const { id } = req.params;
  if (req.body.password) {
    const user = { password: req.body.password, newPassword: req.body.newPassword };
    const result = await usersUpdatePasswordService(id, user);
    if (result.error) {
      return res.status(409).json({ message: result.message });
    }
    return res.status(200).json(result);
  }
  if (req.body.address) {
    const user = { address: req.body.address, door: req.body.door };
    const result = await usersUpdateAddressService(id, user);
    if (result.error) {
      return res.status(409).json({ message: result.message });
}
    return res.status(200).json(result);
  }
};

const usersDeleteController = async (req, res) => {
  const { id } = req.params;
  const result = await usersDeleteService(id);
  if (result.error) {
    return res.status(409).json({ message: 'Não foi possivel deletar usuário' });
  }
  return res.status(200).json(result);
};

module.exports = {
  usersController,
  userGet,
  userGetId,
  allUsersController,
  registerAdminController,
  usersUpdateController,
  usersDeleteController,
};
