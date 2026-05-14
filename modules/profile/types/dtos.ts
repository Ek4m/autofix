export interface EditProfileForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  image:File;
  mechanic: {
    profession: string[];
    objectName: string;
    rawAddress: string;
    locationUrl: string;
    bio: string;
    experienceYears: number;
    city: string;
  } | null;
}
