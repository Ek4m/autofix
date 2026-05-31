import { Sequelize } from "sequelize";

const globalForSequelize = globalThis as unknown as { sequelize: Sequelize };

export const sequelize =
  globalForSequelize.sequelize ||
  new Sequelize(process.env.DATABASE_URL as string, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Essential for many cloud providers
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
if (process.env.NODE_ENV !== "production")
  globalForSequelize.sequelize = sequelize;
