import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,
  public_key: process.env.PUBLIC_KEY,
  private_key: process.env.PRIVATE_KEY,
};

export default config;
