export type ProblemStatus = "open" | "in_progress" | "resolved";
export type UserRole = "user" | "mechanic";

export interface CarProblem {
  id: string;
  authorName: string;
  authorAvatar: string;
  carMake: string;
  carModel: string;
  carYear: number;
  category: string;
  title: string;
  description: string;
  photos: string[];
  location: string;
  status: ProblemStatus;
  isPremium: boolean;
  offerCount: number;
  createdAt: string;
  timeAgo: string;
}

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

export const CAR_PROBLEMS: CarProblem[] = [
  {
    id: "prob-001",
    authorName: "Əli Həsənov",
    authorAvatar: "https://i.pravatar.cc/40?img=11",
    carMake: "Toyota",
    carModel: "Camry",
    carYear: 2019,
    category: "engine",
    title: "Mühərrik işə salınanda qəribə səs çıxarır",
    description:
      "Soyuq havada avtomobili işə salanda mühərrikdən tıq-tıq səsi gəlir. Bir neçə dəqiqə sonra keçir. Yağ səviyyəsi normaldır.",
    photos: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    ],
    location: "Bakı, Nəsimi r.",
    status: "open",
    isPremium: true,
    offerCount: 7,
    createdAt: "2026-04-17T03:00:00Z",
    timeAgo: "2 saat",
  },
  {
    id: "prob-002",
    authorName: "Nigar Quliyeva",
    authorAvatar: "https://i.pravatar.cc/40?img=5",
    carMake: "Hyundai",
    carModel: "Tucson",
    carYear: 2021,
    category: "brakes",
    title: "Əyləc pedalı basıldıqda titrəyir",
    description:
      "Yüksək sürətdən dayandırmağa çalışanda əyləc pedalı güclü titrəyir. Disk əyləcləri 8 ay əvvəl dəyişilib.",
    photos: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop",
    ],
    location: "Bakı, Sabunçu r.",
    status: "open",
    isPremium: false,
    offerCount: 3,
    createdAt: "2026-04-16T20:00:00Z",
    timeAgo: "9 saat",
  },
  {
    id: "prob-003",
    authorName: "Rauf Məmmədov",
    authorAvatar: "https://i.pravatar.cc/40?img=15",
    carMake: "BMW",
    carModel: "5 Series",
    carYear: 2017,
    category: "electrical",
    title: "Batareya tez boşalır, alternator problemi ola bilər",
    description:
      "Hər 3-4 gündən bir batareya tamamilə boşalır. Batareya yenidir, problem alternator və ya elektrik sistemindədir.",
    photos: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    ],
    location: "Bakı, Xətai r.",
    status: "in_progress",
    isPremium: true,
    offerCount: 12,
    createdAt: "2026-04-15T10:00:00Z",
    timeAgo: "1 gün",
  },
  {
    id: "prob-004",
    authorName: "Sevinc Babayeva",
    authorAvatar: "https://i.pravatar.cc/40?img=9",
    carMake: "Kia",
    carModel: "Sportage",
    carYear: 2020,
    category: "ac",
    title: "Kondisioner soyutmur",
    description:
      "Kondisioner işləyir amma soyuq hava vermir. Freon doldurulub amma problem həll olmayıb. Kompressor problemi ola bilər.",
    photos: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    ],
    location: "Sumqayıt",
    status: "open",
    isPremium: false,
    offerCount: 5,
    createdAt: "2026-04-17T00:30:00Z",
    timeAgo: "4.5 saat",
  },
  {
    id: "prob-005",
    authorName: "Tural İsmayılov",
    authorAvatar: "https://i.pravatar.cc/40?img=20",
    carMake: "Mercedes-Benz",
    carModel: "E-Class",
    carYear: 2018,
    category: "suspension",
    title: "Sürət yastığı problemli, yolda çox silkələyir",
    description:
      "Arxa sağ amortizator zəif görünür. Çuxurdan keçəndə güclü çırpma səsi gəlir. Ön tərəf yaxşıdır.",
    photos: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop",
    ],
    location: "Bakı, Binəqədi r.",
    status: "open",
    isPremium: true,
    offerCount: 4,
    createdAt: "2026-04-16T14:00:00Z",
    timeAgo: "15 saat",
  },
  {
    id: "prob-006",
    authorName: "Günel Rzayeva",
    authorAvatar: "https://i.pravatar.cc/40?img=47",
    carMake: "Chevrolet",
    carModel: "Malibu",
    carYear: 2016,
    category: "transmission",
    title: "Sürəti dəyişəndə gecikir və sürpriz keçiş edir",
    description:
      "Avtomatik sürət qutusu 2-3 sürət arasında gecikmə edir. Bəzən sürpriz şəkildə vites atır. Yağı yoxlanılıb, norma.",
    photos: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop",
    ],
    location: "Gəncə",
    status: "resolved",
    isPremium: false,
    offerCount: 9,
    createdAt: "2026-04-14T08:00:00Z",
    timeAgo: "3 gün",
  },
  {
    id: "prob-007",
    authorName: "Orxan Nəcəfov",
    authorAvatar: "https://i.pravatar.cc/40?img=33",
    carMake: "Volkswagen",
    carModel: "Passat",
    carYear: 2015,
    category: "body",
    title: "Qapı kilidi bağlanmır, açarla da, uzaqdan da",
    description:
      "Sürücü qapısının kilidi nə açarla nə də pult ilə işləmir. Elektrik problemi ola bilər. Qapı mexaniki bağlanır.",
    photos: [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=300&fit=crop",
    ],
    location: "Bakı, Suraxanı r.",
    status: "open",
    isPremium: false,
    offerCount: 2,
    createdAt: "2026-04-17T04:00:00Z",
    timeAgo: "1 saat",
  },
  {
    id: "prob-008",
    authorName: "Leyla Hüseynova",
    authorAvatar: "https://i.pravatar.cc/40?img=44",
    carMake: "Nissan",
    carModel: "Qashqai",
    carYear: 2022,
    category: "engine",
    title: "Check Engine işığı yandı, diaqnostika lazımdır",
    description:
      "Dünən gündən bəri Check Engine işığı yanıqlı qalır. Avtomobil normal işləyir, amma işıq söndürülmür.",
    photos: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop",
    ],
    location: "Bakı, Yasamal r.",
    status: "open",
    isPremium: true,
    offerCount: 6,
    createdAt: "2026-04-16T22:00:00Z",
    timeAgo: "7 saat",
  },
];

export const MECHANIC_OFFERS: MechanicOffer[] = [
  {
    id: "offer-001",
    mechanicName: "Vüsal Əliyev",
    mechanicAvatar: "https://i.pravatar.cc/40?img=60",
    rating: 4.9,
    reviewCount: 134,
    isVerified: true,
    price: 80,
    description:
      "Bu problem çox güman ki hidrolik lifter səsidir. 1 saata həll edərəm.",
    estimatedTime: "1-2 saat",
    createdAt: "2026-04-17T03:30:00Z",
  },
  {
    id: "offer-002",
    mechanicName: "Elnur Kərimov",
    mechanicAvatar: "https://i.pravatar.cc/40?img=62",
    rating: 4.7,
    reviewCount: 89,
    isVerified: true,
    price: 65,
    description:
      "Yağ kanallarını təmizləmək lazımdır. Tam diaqnostika aparacam.",
    estimatedTime: "2-3 saat",
    createdAt: "2026-04-17T03:45:00Z",
  },
  {
    id: "offer-003",
    mechanicName: "Samir Hüseynli",
    mechanicAvatar: "https://i.pravatar.cc/40?img=65",
    rating: 4.5,
    reviewCount: 56,
    isVerified: false,
    price: 50,
    description: "Oxşar problemlə çox işləmişəm. Diaqnostika ilə başlayacam.",
    estimatedTime: "3-4 saat",
    createdAt: "2026-04-17T04:00:00Z",
  },
];

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
