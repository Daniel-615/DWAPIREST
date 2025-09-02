const dotenv = require('dotenv');
dotenv.config();

class DBConfig {
  constructor() {
    this.HOST = process.env.HOST;
    this.USER = process.env.USER;
    this.PASSWORD = process.env.PASSWORD;
    this.DB = process.env.DB;
    this.PORT = process.env.DB_PORT;
    this.dialect = process.env.DIALECT;
    this.pool = {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    };
  }

  getConfig() {
    return {
      HOST: this.HOST,
      USER: this.USER,
      PASSWORD: this.PASSWORD,
      DB: this.DB,
      PORT: this.PORT,
      dialect: this.dialect,
      pool: this.pool
    };
  }
}

module.exports = new DBConfig().getConfig();
