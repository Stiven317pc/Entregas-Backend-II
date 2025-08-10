import crypto from 'crypto';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository.js';
import PasswordResetRepository from '../repositories/passwordReset.repository.js';
import { transporter } from '../config/mailerConfig.js';

const userRepo = new UserRepository();
const tokenRepo = new PasswordResetRepository();

export default class PasswordResetService {
  async requestReset(email) {
    const user = await userRepo.getUserByEmail(email);
    if (!user) throw new Error('No existe un usuario con ese correo');

    const token = crypto.randomBytes(32).toString('hex');
    await tokenRepo.saveToken(user.id, token);

    const resetLink = `${process.env.BASE_URL}/api/password/validate-token/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña',
      html: `
        <h2>Hola ${user.name}</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">Recuperar contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    });
  }

  async validateToken(token) {
    const tokenDoc = await tokenRepo.getToken(token);
    if (!tokenDoc) throw new Error('Token inválido');

    if (tokenDoc.expiresAt < new Date()) {
      await tokenRepo.removeToken(token);
      throw new Error('Token expirado');
    }

    return tokenDoc.userId;
  }

  async resetPassword(token, newPassword) {
    const tokenDoc = await tokenRepo.getToken(token);
    if (!tokenDoc) throw new Error('Token inválido');

    if (tokenDoc.expiresAt < new Date()) {
      await tokenRepo.removeToken(token);
      throw new Error('Token expirado');
    }

    const user = await userRepo.getUserById(tokenDoc.userId);
    if (!user) throw new Error('Usuario no encontrado');

    // Validación de contraseña segura
    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      /[^a-zA-Z0-9]/.test(newPassword)
    ) {
      throw new Error('La contraseña debe tener al menos 8 caracteres, incluir letras y números, y no contener símbolos especiales');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new Error('La nueva contraseña no puede ser igual a la anterior');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepo.updateUserPassword(user.id, hashedPassword);
    await tokenRepo.removeToken(token);
  }
}
