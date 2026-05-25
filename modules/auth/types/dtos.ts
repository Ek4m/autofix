export interface LoginForm {
  email: string;
  password: string;
}

export interface MechanicForm {
  profession: string[];
  objectName: string;
  rawAddress: string;
  locationUrl: string;
  bio: string;
  experienceYears: string;
  city: string;
}

export interface RegisterForm extends LoginForm {
  fullName: string;
  passwordConfirm: string;
  phoneNumber: string;
  mechanic: MechanicForm | null;
}
