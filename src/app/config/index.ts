import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  databaseURI: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV || 'development',
  bcrypt_salt: parseInt(process.env.BCRYPT_SALT as string) || 10,
  access_token_secret: process.env.JWT_ACCESS_SECRET,
  access_token_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  refresh_token_expires: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  admin_email: process.env.ADMIN_EMAIL,
  app_pass: process.env.APP_PASS,

  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_user_name: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },
};
