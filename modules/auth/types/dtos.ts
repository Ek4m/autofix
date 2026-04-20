export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  fullName: string;
  passwordConfirm: string;
  phone: string;
  mechanic: {
    specialization: string;
    garageName: string;
    experienceYears: number;
    city: string;
  } | null;
}
