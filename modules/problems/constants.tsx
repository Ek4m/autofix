import { HiCheckCircle } from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { ImInfo } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";

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

export const PROBLEM_STATUS_CONFIG: Record<
  string,
  { labelKey: string; color: string; icon: React.ReactNode }
> = {
  [PROBLEM_STATUS.COMPLETED]: {
    labelKey: "Tamamlandı",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: <HiCheckCircle size={14} />,
  },
  [PROBLEM_STATUS.ASSIGNED]: {
    labelKey: "Həvalə edilib",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <HiOutlineArrowPath size={14} className="animate-spin" />,
  },
  [PROBLEM_STATUS.OPEN]: {
    labelKey: "Açıqdır",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: <ImInfo size={14} className="animate-ping" />,
  },
  [PROBLEM_STATUS.CANCELLED]: {
    labelKey: "Ləğv olundu",
    color: "bg-red-100 text-red-500 border-red-200",
    icon: <MdOutlineCancel size={16} className="animate-pulse" />,
  },
};

export const OFFER_STATUS_CONFIG: Record<
  string,
  {
    labelKey: string;
    color: "error" | "info" | "success";
    icon: React.ReactNode;
  }
> = {
  [OFFER_STATUS.ACCEPTED]: {
    labelKey: "Qəbul edildi",
    color: "success",
    icon: <HiCheckCircle size={14} />,
  },
  [OFFER_STATUS.DECLINED]: {
    labelKey: "Ləğv edildi",
    color: "error",
    icon: <HiOutlineArrowPath size={14} className="animate-spin" />,
  },
  [OFFER_STATUS.PENDING]: {
    labelKey: "Cavab gözlənir",
    color: "info",
    icon: <HiCheckCircle size={14} />,
  },
};
