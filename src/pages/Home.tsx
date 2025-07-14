import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";
import { createWhatsAppLink } from "@/utils/whatsapp";
import heroBg from "@/assets/hero-wood-bg.jpg";

const Home = () => {
  const featuredProducts = sampleProducts.slice(0, 3);

  const features = [
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Kualitas Terjamin",
      description: "Kayu pilihan dengan grade terbaik dan sudah melalui proses pengeringan"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Garansi Kualitas",
      description: "Jaminan kualitas kayu sesuai standar dan dapat dikembalikan jika tidak sesuai"
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Pengiriman Aman",
      description: "Pengiriman dengan packaging aman ke seluruh Indonesia"
    }
  ];

  const handleWhatsAppOrder = (product: any) => {
    window.open(createWhatsAppLink(product), '_blank');
  };

  const handleViewDetails = (product: any) => {
    // For now, just scroll to product or show alert
    alert(`Detail produk: ${product.name}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative text-primary-foreground py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              UD Sumberjaya
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Penyedia Kayu Berkualitas Tinggi
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              Melayani kebutuhan kayu untuk konstruksi, furniture, dan kerajinan dengan standar kualitas terbaik sejak 1995
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link to="/products">
                  Lihat Produk
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">
                  Hubungi Kami
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen memberikan pelayanan terbaik dengan produk berkualitas tinggi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Produk Unggulan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pilihan kayu terbaik dengan kualitas premium untuk berbagai kebutuhan
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onWhatsAppOrder={handleWhatsAppOrder}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-wood hover:opacity-90">
              <Link to="/products">
                Lihat Semua Produk
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Untuk Berkolaborasi?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Konsultasikan kebutuhan kayu Anda dengan tim ahli kami. 
            Kami siap membantu proyek konstruksi dan furniture impian Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                Konsultasi Gratis
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/location">
                Kunjungi Lokasi
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;