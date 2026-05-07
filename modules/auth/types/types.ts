export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
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
