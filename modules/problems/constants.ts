export enum ORDER_BY_CREATION {
  DESC = "DESC",
  ASC = "ASC",
}

export enum PROBLEM_STATUS {
  OPEN = "open",
  ASSIGNED = "assigned",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum OFFER_STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export const TIME_UNITS = [
  { label: "Saat", value: 1 },
  { label: "Gün", value: 24 },
];
