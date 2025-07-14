import { Users, Award, Clock, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const stats = [
    { icon: <Clock className="w-8 h-8 text-primary" />, label: "Tahun Berpengalaman", value: "28+" },
    { icon: <Users className="w-8 h-8 text-primary" />, label: "Pelanggan Puas", value: "5000+" },
    { icon: <TreePine className="w-8 h-8 text-primary" />, label: "Jenis Kayu", value: "50+" },
    { icon: <Award className="w-8 h-8 text-primary" />, label: "Proyek Selesai", value: "10000+" },
  ];

  const values = [
    {
      title: "Kualitas Terjamin",
      description: "Setiap kayu yang kami jual telah melalui proses seleksi ketat dan pengeringan optimal untuk memastikan kualitas terbaik."
    },
    {
      title: "Pelayanan Profesional",
      description: "Tim ahli kami siap membantu Anda memilih jenis kayu yang tepat sesuai kebutuhan proyek konstruksi atau furniture."
    },
    {
      title: "Harga Kompetitif",
      description: "Kami menawarkan harga yang bersaing di pasaran tanpa mengurangi kualitas produk yang kami berikan."
    },
    {
      title: "Pengiriman Terpercaya",
      description: "Sistem pengiriman yang aman dan tepat waktu ke seluruh Indonesia dengan packaging yang melindungi kualitas kayu."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tentang UD Sumberjaya
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Penyedia kayu berkualitas tinggi yang telah dipercaya sejak 1995. 
            Kami berkomitmen memberikan produk terbaik untuk kebutuhan konstruksi dan furniture Anda.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Sejarah Perjalanan Kami
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  UD Sumberjaya didirikan pada tahun 1995 oleh Bapak Sumber dengan visi menyediakan 
                  kayu berkualitas tinggi untuk masyarakat Indonesia. Berawal dari sebuah toko kecil 
                  di kota kecil, kami terus berkembang hingga menjadi salah satu supplier kayu 
                  terpercaya di Indonesia.
                </p>
                <p>
                  Dengan pengalaman lebih dari 28 tahun di industri kayu, kami telah melayani 
                  ribuan pelanggan mulai dari perorangan, kontraktor, hingga perusahaan besar. 
                  Komitmen kami terhadap kualitas dan pelayanan membuat kepercayaan pelanggan 
                  terus bertumbuh.
                </p>
                <p>
                  Saat ini, UD Sumberjaya memiliki gudang yang luas dengan koleksi berbagai 
                  jenis kayu premium dari seluruh nusantara. Kami juga dilengkapi dengan 
                  teknologi modern untuk proses pengeringan dan pengolahan kayu.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/500/400"
                alt="Gudang UD Sumberjaya"
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi dalam setiap pelayanan dan produk yang kami berikan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center bg-secondary/30 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Tim Profesional Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Didukung oleh tim ahli yang berpengalaman di bidang industri kayu, 
            siap memberikan konsultasi dan solusi terbaik untuk kebutuhan Anda.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-wood rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Tim Penjualan</h3>
              <p className="text-sm text-muted-foreground">
                Membantu Anda memilih produk yang tepat
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-wood rounded-full mx-auto mb-4 flex items-center justify-center">
                <TreePine className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ahli Kayu</h3>
              <p className="text-sm text-muted-foreground">
                Menilai dan memastikan kualitas setiap kayu
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-wood rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quality Control</h3>
              <p className="text-sm text-muted-foreground">
                Menjaga standar kualitas tertinggi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;