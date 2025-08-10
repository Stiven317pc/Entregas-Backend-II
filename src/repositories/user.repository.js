import UserDAO from '../daos/user.dao.js';
import UserDTO from '../dtos/UserDTO.js';

const userDAO = new UserDAO();

export default class UserRepository {
  async createUser(userData) {
    const user = await userDAO.create(userData);
    return new UserDTO(user);
  }

  async getUserByEmail(email) {
    const user = await userDAO.findByEmail(email);
    return user ? new UserDTO(user) : null;
  }

  async getUserById(id) {
    const user = await userDAO.findById(id);
    return user ? new UserDTO(user) : null;
  }

  async updateUserRole(id, role) {
    const updatedUser = await userDAO.updateRole(id, role);
    return new UserDTO(updatedUser);
  }

  async updateUserPassword(id, newPassword) {
    const updatedUser = await userDAO.updatePassword(id, newPassword);
    return new UserDTO(updatedUser);
  }

  async deleteUser(id) {
    return await userDAO.deleteById(id);
  }
}
