import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  databaseURI: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt: process.env.BCRYPT_SALT,
  access_token_secret: process.env.JWT_ACCESS_SECRET,
  access_token_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  refresh_token_expires: process.env.JWT_REFRESH_EXPIRES_IN,
};
