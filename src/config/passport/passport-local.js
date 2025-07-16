import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../../dao/models/userModel.js';
import bcrypt from 'bcrypt';

passport.use('register', new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const userExistente = await UserModel.findOne({ email });
      if (userExistente) return done(null, false);

      const hashedPassword = bcrypt.hashSync(password, 10);
      const nuevoUsuario = await UserModel.create({
        ...req.body,
        password: hashedPassword
      });

      return done(null, nuevoUsuario);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use('login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const usuario = await UserModel.findOne({ email });
      if (!usuario) return done(null, false);

      const esValido = bcrypt.compareSync(password, usuario.password);
      if (!esValido) return done(null, false);

      return done(null, usuario);
    } catch (error) {
      return done(error);
    }
  }
));
