import PasswordResetToken from '../models/PasswordResetToken.js';

export default class PasswordResetDAO {
  async createToken(userId, token, expiresAt) {
    return PasswordResetToken.create({ userId, token, expiresAt });
  }

  async findByToken(token) {
    return PasswordResetToken.findOne({ token });
  }

  async deleteToken(token) {
    return PasswordResetToken.deleteOne({ token });
  }
}
