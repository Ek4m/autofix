export interface PostProblemForm {
  title: string;
  description: string;
  carMake: string;
  carModel: string;
  carYear: string;
  category: string;
  city: string;
  isVip: boolean;
  vipInfo?: {
    vipLifeTime: string;
    minBudget: string;
    maxBudget: string;
  };
}
