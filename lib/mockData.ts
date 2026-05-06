export type ProblemStatus = "open" | "in_progress" | "resolved";
export type UserRole = "user" | "mechanic";

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

export const MECHANIC_SERVICES: MechanicService[] = [
  {
    id: "svc-001",
    mechanicId: "mech-001",
    mechanicName: "Vüsal Əliyev",
    mechanicAvatar: "https://i.pravatar.cc/80?img=60",
    garageName: "AutoPro Servis",
    isVerified: true,
    rating: 4.9,
    reviewCount: 134,
    location: "Bakı, Nəsimi r.",
    phone: "+994 55 123 45 67",
    serviceName: "Tam Mühərrik Diaqnostikası",
    category: "engine",
    description:
      "OBD-II skaneri ilə tam kompüter diaqnostikası. Xəta kodlarını oxuyuram, aradan qaldırıram. Toyota, Honda, Nissan ixtisasım.",
    priceMin: 30,
    priceMax: 80,
    isPremium: true,
    isAvailable: true,
    experience: 12,
    specializations: ["Toyota", "Honda", "Nissan", "Hyundai"],
    createdAt: "2026-04-15T09:00:00Z",
  },
  {
    id: "svc-002",
    mechanicId: "mech-002",
    mechanicName: "Elnur Kərimov",
    mechanicAvatar: "https://i.pravatar.cc/80?img=62",
    garageName: "Kərimov Auto",
    isVerified: true,
    rating: 4.7,
    reviewCount: 89,
    location: "Bakı, Xətai r.",
    phone: "+994 50 987 65 43",
    serviceName: "Əyləc Sistemi Təmiri",
    category: "brakes",
    description:
      "Disk, baraban, əyləc kaliperi, boru dəyişimi. Bütün markalar üçün orijinal ehtiyat hissələri ilə iş görürəm.",
    priceMin: 60,
    priceMax: 200,
    isPremium: true,
    isAvailable: true,
    experience: 8,
    specializations: ["BMW", "Mercedes", "Audi", "Volkswagen"],
    createdAt: "2026-04-14T11:00:00Z",
  },
  {
    id: "svc-003",
    mechanicId: "mech-003",
    mechanicName: "Samir Hüseynli",
    mechanicAvatar: "https://i.pravatar.cc/80?img=65",
    garageName: "Hüseynli Qaraj",
    isVerified: false,
    rating: 4.5,
    reviewCount: 56,
    location: "Sumqayıt",
    phone: "+994 77 456 78 90",
    serviceName: "Kondisioner Qazı Doldurma",
    category: "ac",
    description:
      "R134a və R1234yf freon doldurma. Sızma testi, kompressor yoxlaması. Mobil xidmət mövcuddur.",
    priceMin: 40,
    priceMax: 120,
    isPremium: false,
    isAvailable: true,
    experience: 5,
    specializations: ["Kia", "Hyundai", "Chevrolet"],
    createdAt: "2026-04-16T08:30:00Z",
  },
  {
    id: "svc-004",
    mechanicId: "mech-004",
    mechanicName: "Rəşad Babayev",
    mechanicAvatar: "https://i.pravatar.cc/80?img=68",
    garageName: "Premium Auto Xidmət",
    isVerified: true,
    rating: 4.8,
    reviewCount: 201,
    location: "Bakı, Yasamal r.",
    phone: "+994 51 234 56 78",
    serviceName: "Asqı Sistemi Diaqnostika və Təmir",
    category: "suspension",
    description:
      "Amortizator, yay, salnik, balans çubuğu. Kompüter balanslaşdırma ilə tam asqı sistemi yoxlaması.",
    priceMin: 50,
    priceMax: 350,
    isPremium: true,
    isAvailable: false,
    experience: 15,
    specializations: ["BMW", "Mercedes", "Lexus", "Toyota"],
    createdAt: "2026-04-13T14:00:00Z",
  },
  {
    id: "svc-005",
    mechanicId: "mech-005",
    mechanicName: "Kamran Nəcəfov",
    mechanicAvatar: "https://i.pravatar.cc/80?img=70",
    garageName: "KN Elektrik Servis",
    isVerified: true,
    rating: 4.6,
    reviewCount: 73,
    location: "Bakı, Binəqədi r.",
    phone: "+994 55 876 54 32",
    serviceName: "Avtomobil Elektrik Sistemləri",
    category: "electrical",
    description:
      "Alternator, starter, batareya, işıqlandırma sistemi. Tam elektrik diaqnostikası. BMW E-seriyası ixtisasım.",
    priceMin: 25,
    priceMax: 300,
    isPremium: false,
    isAvailable: true,
    experience: 10,
    specializations: ["BMW", "Audi", "Volkswagen"],
    createdAt: "2026-04-16T16:00:00Z",
  },
  {
    id: "svc-006",
    mechanicId: "mech-006",
    mechanicName: "Fərid Qasımov",
    mechanicAvatar: "https://i.pravatar.cc/80?img=72",
    garageName: "AutoTrans Servis",
    isVerified: true,
    rating: 4.4,
    reviewCount: 48,
    location: "Gəncə",
    phone: "+994 70 345 67 89",
    serviceName: "Avtomatik Sürət Qutusu Təmiri",
    category: "transmission",
    description:
      "ATF dəyişimi, sürət qutusu yuyulması, elektron idarəetmə yoxlaması. 6 aylıq zəmanət.",
    priceMin: 100,
    priceMax: 800,
    isPremium: false,
    isAvailable: true,
    experience: 7,
    specializations: ["Chevrolet", "Ford", "Opel"],
    createdAt: "2026-04-15T12:00:00Z",
  },
  {
    id: "svc-007",
    mechanicId: "mech-007",
    mechanicName: "Azər Məhərrəmov",
    mechanicAvatar: "https://i.pravatar.cc/80?img=75",
    garageName: "BodyMaster Pro",
    isVerified: true,
    rating: 4.7,
    reviewCount: 112,
    location: "Bakı, Suraxanı r.",
    phone: "+994 51 654 32 10",
    serviceName: "Kuzov Boyama və Bərpa",
    category: "body",
    description:
      "Tam və qismən kuzov boyama, zədə bərpası, PDR (boyasız çuxur bərpası). Rəng uyğunlaşdırma sistemi.",
    priceMin: 80,
    priceMax: 1200,
    isPremium: true,
    isAvailable: true,
    experience: 18,
    specializations: ["Bütün markalar"],
    createdAt: "2026-04-12T10:00:00Z",
  },
  {
    id: "svc-008",
    mechanicId: "mech-008",
    mechanicName: "Murad Əsgərov",
    mechanicAvatar: "https://i.pravatar.cc/80?img=77",
    garageName: "Quick Fix Auto",
    isVerified: false,
    rating: 4.2,
    reviewCount: 31,
    location: "Bakı, Abşeron r.",
    phone: "+994 70 123 45 67",
    serviceName: "Sürətli Yağ Dəyişimi",
    category: "engine",
    description:
      "Sintetik, yarım-sintetik, mineral mühərrik yağı dəyişimi. Hava, yağ, yanacaq filtrləri. 30 dəqiqə ərzində.",
    priceMin: 20,
    priceMax: 60,
    isPremium: false,
    isAvailable: true,
    experience: 4,
    specializations: ["Kia", "Hyundai", "Toyota", "Nissan"],
    createdAt: "2026-04-17T01:00:00Z",
  },
];
