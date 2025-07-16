import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../../dao/models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET no está definido en el archivo .env');
}

passport.use('current', new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => req?.cookies?.jwt 
    ]),
    secretOrKey: JWT_SECRET
  },
  async (jwtPayload, done) => {
    try {
      const usuario = await UserModel.findById(jwtPayload._id);
      if (!usuario) return done(null, false);
      return done(null, usuario);
    } catch (error) {
      return done(error);
    }
  }
));
