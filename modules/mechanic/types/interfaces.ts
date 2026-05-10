export interface MechanicOffer {
  id: string;
  mechanicName: string;
  mechanicAvatar: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  price: number;
  description: string;
  estimatedTime: string;
  createdAt: string;
}

export interface MechanicService {
  id: string;
  serviceName: string;
  category: string;
  description: string;
  priceMin: number;
  priceMax: number;
  categories: string[];
}
