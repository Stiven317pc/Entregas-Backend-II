import { UserModel } from '../models/User.js';

export default class UserDAO {
  async create(userData) {
    return UserModel.create(userData);
  }

  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async findById(id) {
    return UserModel.findById(id);
  }

  async updateRole(id, role) {
    return UserModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  async updatePassword(id, hashedPassword) {
    return UserModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
  }

  async deleteById(id) {
    return UserModel.findByIdAndDelete(id);
  }
}
