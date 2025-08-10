import passport from 'passport';
import local from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';

const LocalStrategy = local.Strategy;

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, role, phone } = req.body;

        if (!first_name || !last_name || !email || !password) {
          return done(null, false, { message: 'Faltan campos obligatorios' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return done(null, false, { message: 'Usuario ya registrado' });

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = await UserModel.create({
          first_name,
          last_name,
          email,
          password: hashedPassword,
          role: role || 'user',
          phone,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) return done(null, false, { message: 'Contraseña incorrecta' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.jwt || null
      ]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
