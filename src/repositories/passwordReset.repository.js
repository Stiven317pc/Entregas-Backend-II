import PasswordResetDAO from '../daos/passwordReset.dao.js';

export default class PasswordResetRepository {
  constructor() {
    this.dao = new PasswordResetDAO();
  }

  async saveToken(userId, token) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); 
    return await this.dao.createToken(userId, token, expiresAt);
  }

  async getToken(token) {
    return await this.dao.findByToken(token);
  }

  async removeToken(token) {
    return await this.dao.deleteToken(token);
  }
}
