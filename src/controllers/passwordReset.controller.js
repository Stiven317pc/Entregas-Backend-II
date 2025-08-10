import PasswordResetService from '../services/passwordReset.service.js';

const service = new PasswordResetService();

export const showRecoverForm = (req, res) => {
  res.render('recover');
};

export const requestPasswordReset = async (req, res) => {
  try {
    await service.requestReset(req.body.email);
    res.status(200).render('recover', { message: 'Revise su correo para continuar con el proceso.' });
  } catch (err) {
    res.status(400).render('recover', { error: err.message });
  }
};

export const validateToken = async (req, res) => {
  try {
    await service.validateToken(req.params.token);
    res.render('resetPassword', { token: req.params.token });
  } catch (err) {
    res.status(400).render('notFound', { message: 'Token inválido o expirado.' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render('resetPassword', {
        token,
        error: 'Las contraseñas no coinciden.'
      });
    }

    await service.resetPassword(token, password);
    res.render('successReset');
  } catch (err) {
    res.status(400).render('resetPassword', {
      token,
      error: err.message
    });
  }
};
