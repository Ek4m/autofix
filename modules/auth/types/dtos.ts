export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  fullName: string;
  passwordConfirm: string;
  phoneNumber: string;
  mechanic: {
    profession: string;
    garageName: string;
    experienceYears: number;
    city: string;
  } | null;
}
