import { Sequelize, DataTypes, Model } from "sequelize";
import pg from "pg";
import { ICategory } from "@/modules/categories/types";
import { EntityType } from "@/constants/enums";
import { OFFER_STATUS, PROBLEM_STATUS } from "@/modules/problems/constants";
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
  profilePicture: string;
}> {}
User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
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
    thumbnail: DataTypes.STRING,
    minBudget: DataTypes.STRING,
    maxBudget: DataTypes.STRING,
    carModel: DataTypes.STRING,
    carYear: DataTypes.INTEGER,
    city: DataTypes.STRING,
    isVip: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.STRING, defaultValue: PROBLEM_STATUS.OPEN },
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "user_issues",
    timestamps: true,
  },
);

// -------- UPLOAD --------
export class Upload extends Model {}
Upload.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    entityId: DataTypes.INTEGER,
    type: DataTypes.ENUM(EntityType.PROBLEM),
  },
  {
    sequelize,
    tableName: "uploads",
    timestamps: true,
  },
);

// -------- OFFER --------
export class Offer extends Model {}
Offer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    description: DataTypes.STRING(500),
    minHours: DataTypes.INTEGER,
    maxHours: DataTypes.INTEGER,
    minHoursUnit: DataTypes.INTEGER,
    status: { type: DataTypes.STRING, defaultValue: OFFER_STATUS.PENDING },
    maxHoursUnit: DataTypes.INTEGER,
    minPrice: DataTypes.INTEGER,
    maxPrice: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "offers",
    timestamps: true,
  },
);

// -------- SPECIALIST --------
export class SpecialistInfo extends Model {}
SpecialistInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    profession: DataTypes.JSONB,
    experienceYears: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    locationUrl: DataTypes.STRING,
    rawAddress: DataTypes.STRING,
    objectName: DataTypes.STRING,
    city: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "specialist_info",
    timestamps: true,
  },
);

// -------- VIP --------
export class VipInfo extends Model {}
VipInfo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    expiresAt: DataTypes.DATEONLY,
    entityType: DataTypes.ENUM(EntityType.PROBLEM, EntityType.SERVICE),
    entityId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "vip_infos",
    timestamps: true,
  },
);

// --------- CATEGORY --------
export class Category extends Model<Partial<ICategory>> {}
Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // null = top-level category
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: true,
  },
);

// ------ SERVICE --------

export class Service extends Model {}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceName: DataTypes.STRING,
    description: DataTypes.TEXT,
    priceMin: DataTypes.INTEGER,
    priceMax: DataTypes.INTEGER,
    isVip: DataTypes.BOOLEAN,
    categories: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "mechanic_services",
    timestamps: true,
  },
);

// ------ OFFER_AGREEMENT --------

export class OfferAgreement extends Model {}

OfferAgreement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "offer_agreements",
    timestamps: true,
  },
);

// ------ MECHANIC REVIEW --------

export class MechanicReview extends Model {}

MechanicReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT("long"),
    },
    rating: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "mechanic_reviews",
    timestamps: true,
  },
);

// ------ CAR BRAND --------
export class CarBrand extends Model {}

CarBrand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, defaultValue: false },
    isPopular: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    tableName: "car_brands",
    timestamps: true,
  },
);

// ------ CAR MODEL --------
export class CarModel extends Model {}

CarModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    brandId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "car_models",
    timestamps: true,
  },
);

// ================= RELATIONS =================

// USER ↔ PROBLEM
User.hasMany(Problem, { foreignKey: "userId", as: "problems" });
Problem.belongsTo(User, { foreignKey: "userId", as: "user" });

// CATEGORY ↔ PROBLEM
Category.hasMany(Problem, { foreignKey: "categoryId", as: "problems" });
Problem.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// CATEGORY ↔ PARENT CATEGORY
Category.hasMany(Category, {
  foreignKey: "parentId",
  as: "subcategories",
});

Category.belongsTo(Category, {
  foreignKey: "parentId",
  as: "parent",
});

// USER ↔ SPECIALIST
User.hasOne(SpecialistInfo, { foreignKey: "userId", as: "specialistInfo" });
SpecialistInfo.belongsTo(User, { foreignKey: "userId", as: "user" });

// USER  ↔ OFFER
User.hasMany(Offer, { foreignKey: "userId", as: "offers" });
Offer.belongsTo(User, { foreignKey: "userId", as: "user" });

// OFFER  ↔ PROBLEM
Problem.hasMany(Offer, { foreignKey: "problemId", as: "offers" });
Offer.belongsTo(Problem, { foreignKey: "problemId", as: "problem" });

// USER ↔ SERVICES
User.hasMany(Service, { foreignKey: "userId", as: "services" });
Service.belongsTo(User, { foreignKey: "userId", as: "user" });

// OFFER_AGREEMENT ↔ OFFERS
Offer.hasOne(OfferAgreement, { foreignKey: "offerId", as: "offerAgreement" });
OfferAgreement.belongsTo(Offer, { foreignKey: "offerId", as: "offer" });

// OFFER_AGREEMENT ↔ ISSUES
Problem.hasOne(OfferAgreement, {
  foreignKey: "problemId",
  as: "offerAgreement",
});
OfferAgreement.belongsTo(Problem, { foreignKey: "problemId", as: "problem" });

// USER (customer) ↔ REVIEW
User.hasMany(MechanicReview, {
  foreignKey: "userId",
  as: "givenReviews",
});

MechanicReview.belongsTo(User, {
  foreignKey: "userId",
  as: "reviewer",
});

// MECHANIC ↔ REVIEW
User.hasMany(MechanicReview, {
  foreignKey: "mechanicId",
  as: "receivedReviews",
});

MechanicReview.belongsTo(User, {
  foreignKey: "mechanicId",
  as: "mechanic",
});

// PROBLEM ↔ REVIEW
Problem.hasOne(MechanicReview, {
  foreignKey: "problemId",
  as: "review",
});

MechanicReview.belongsTo(Problem, {
  foreignKey: "problemId",
  as: "problem",
});

// OFFER AGREEMENT ↔ REVIEW
OfferAgreement.hasOne(MechanicReview, {
  foreignKey: "offerAgreementId",
  as: "review",
});

MechanicReview.belongsTo(OfferAgreement, {
  foreignKey: "offerAgreementId",
  as: "offerAgreement",
});

// CAR MODEL ↔ CAR BRAND
CarBrand.hasMany(CarModel, {
  foreignKey: "brandId",
  as: "models",
});

CarModel.belongsTo(CarBrand, {
  foreignKey: "brandId",
  as: "brand",
});

// ================= INIT =================

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true, logging: false });
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    throw error;
  }

  return sequelize;
};
