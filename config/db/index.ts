import { Sequelize, DataTypes, Model } from "sequelize";
import pg from "pg";
// ================= DB =================
export const sequelize = new Sequelize({
  dialect: "postgres",
  dialectModule: pg,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "salmanov99",
  database: "autofix",
  logging: console.log,
});

// ================= MODELS =================

// -------- USER --------
export class User extends Model<{
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}> {}
User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  },
);

// -------- PROBLEM --------
export class Problem extends Model {}
Problem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    carMake: DataTypes.STRING,
    carModel: DataTypes.STRING,
    carYear: DataTypes.INTEGER,
    category: DataTypes.STRING,
    city: DataTypes.STRING,
    isVip: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.STRING, defaultValue: "PENDING" },
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "user_issues",
    timestamps: true,
  },
);

// -------- SPECIALIST --------
export class SpecialistInfo extends Model {}
SpecialistInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    profession: DataTypes.STRING,
    experienceYears: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    locationUrl: DataTypes.STRING,
    objectName: DataTypes.STRING,
    city: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "specialist_info",
    timestamps: false,
  },
);

// -------- VIP --------
export class VipInfo extends Model {}
VipInfo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    minBudget: DataTypes.STRING,
    maxBudget: DataTypes.STRING,
    expiresAt: DataTypes.DATEONLY,
    problemId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "vip_infos",
    timestamps: false,
  },
);

// ================= RELATIONS =================

// USER ↔ PROBLEM
User.hasMany(Problem, { foreignKey: "userId", as: "problems" });
Problem.belongsTo(User, { foreignKey: "userId", as: "user" });

// USER ↔ SPECIALIST
User.hasOne(SpecialistInfo, { foreignKey: "userId", as: "specialistInfo" });
SpecialistInfo.belongsTo(User, { foreignKey: "userId", as: "user" });

// PROBLEM ↔ VIP
Problem.hasOne(VipInfo, { foreignKey: "problemId", as: "vipInfo" });
VipInfo.belongsTo(Problem, { foreignKey: "problemId", as: "problem" });

// ================= INIT =================

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    throw error;
  }

  return sequelize;
};
