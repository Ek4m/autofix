export interface PostProblemForm {
  title: string;
  description: string;
  carMake: string;
  carModel: string;
  carYear: string;
  categoryId: number;
  city: string;
  isVip: boolean;
  images: File[];
  minBudget: string;
  maxBudget: string;
}

export interface OfferForm {
  description: string;
  minHours: string;
  maxHours: string;
  minHoursUnit: string;
  maxHoursUnit: string;
  minPrice: string;
  maxPrice: string;
}
