import bcrypt from 'bcrypt';

export function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(inputPassword, hashedPassword) {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}
