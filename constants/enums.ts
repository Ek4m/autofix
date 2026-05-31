export enum EntityType {
  PROBLEM = "problem",
  SERVICE = "service",
}

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://autoback-ievh.onrender.com"
    : "http://localhost:4000";
