import { Product } from "@/data/products";

// Nomor WhatsApp UD Sumberjaya (ganti dengan nomor sebenarnya)
const WHATSAPP_NUMBER = "6281234567890";

export const createWhatsAppLink = (product: Product) => {
  const message = `Halo, saya tertarik dengan produk berikut:

🏷️ *${product.name}*
📝 ${product.description}
💰 Harga: ${formatPrice(product.price)}
📦 Kategori: ${product.category}

Apakah produk ini masih tersedia? Saya ingin mendapatkan informasi lebih lanjut tentang:
- Ketersediaan stok
- Proses pemesanan
- Pengiriman

Terima kasih!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};