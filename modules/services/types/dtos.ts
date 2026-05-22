export interface PostServiceForm {
  serviceName: string;
  categories: number[];
  description: string;
  priceMin: number;
  priceMax: number;
  isVip: boolean;
}
