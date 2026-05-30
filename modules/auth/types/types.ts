import { USER_ROLES } from "../vault";

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: USER_ROLES;
  profilePicture: string;
  specialistInfo?: {
    profession: number[];
    bio: string;
    locationUrl: string;
    objectName: string;
    rawAddress: string;
    experienceYears: number;
    city: string;
  } | null;
}
