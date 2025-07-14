export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Kayu Jati Grade A",
    description: "Kayu jati kualitas premium untuk furniture mewah. Sudah kering dan siap pakai.",
    price: 2500000,
    image: "/src/assets/teak-wood.jpg",
    category: "Kayu Jati",
    stock: 25
  },
  {
    id: 2,
    name: "Kayu Mahoni Super",
    description: "Kayu mahoni berkualitas tinggi untuk konstruksi dan furniture berkelas.",
    price: 1800000,
    image: "/src/assets/mahogany-wood.jpg",
    category: "Kayu Mahoni",
    stock: 40
  },
  {
    id: 3,
    name: "Kayu Meranti Merah",
    description: "Kayu meranti merah untuk konstruksi rumah dan bangunan komersial.",
    price: 1200000,
    image: "/src/assets/meranti-wood.jpg",
    category: "Kayu Meranti",
    stock: 60
  },
  {
    id: 4,
    name: "Kayu Bengkirai",
    description: "Kayu bengkirai tahan air untuk decking dan konstruksi outdoor.",
    price: 2200000,
    image: "/src/assets/bengkirai-wood.jpg",
    category: "Kayu Bengkirai",
    stock: 15
  },
  {
    id: 5,
    name: "Kayu Kelapa",
    description: "Kayu kelapa eco-friendly untuk furniture unik dan ramah lingkungan.",
    price: 800000,
    image: "/src/assets/coconut-wood.jpg",
    category: "Kayu Kelapa",
    stock: 30
  },
  {
    id: 6,
    name: "Kayu Sonokeling",
    description: "Kayu sonokeling premium untuk furniture eksklusif dan kerajinan.",
    price: 3500000,
    image: "/src/assets/sonokeling-wood.jpg",
    category: "Kayu Sonokeling",
    stock: 8
  }
];

export const categories = [
  "Semua Kategori",
  "Kayu Jati",
  "Kayu Mahoni",
  "Kayu Meranti",
  "Kayu Bengkirai",
  "Kayu Kelapa",
  "Kayu Sonokeling"
];