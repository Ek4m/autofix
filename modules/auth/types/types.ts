export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  mechanicInfo?: {
    profession: number[];
    objectName: string;
    experienceYears: number;
    city: string;
  } | null;
}
