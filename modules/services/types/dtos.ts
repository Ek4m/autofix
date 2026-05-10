export interface PostServiceForm {
  serviceName: string;
  categories: string[];
  description: string;
  priceMin: number;
  priceMax: number;
  isVip: boolean;
}
