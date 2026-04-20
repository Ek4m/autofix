import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { SpecialistInfo } from "./entities/SpecialistInfo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "salmanov99",
  database: "autofix",
  synchronize: true, // Be careful with this in production
  logging: false,
  entities: [User, SpecialistInfo],
});

export const initDb = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  }
  return AppDataSource;
};
