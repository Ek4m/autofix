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
  mechanicId: string;
  mechanicName: string;
  mechanicAvatar: string;
  garageName: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  location: string;
  phone: string;
  serviceName: string;
  category: string;
  description: string;
  priceMin: number;
  priceMax: number;
  isPremium: boolean;
  isAvailable: boolean;
  experience: number;
  specializations: string[];
  createdAt: string;
}
