import bcrypt from 'bcrypt';

export function hashing(password) {
  return bcrypt.hashSync(password, 10);
}

export function checkPassword(password, userPassword) {
  return bcrypt.compareSync(password, userPassword);
}
