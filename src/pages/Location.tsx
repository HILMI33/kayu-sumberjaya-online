import { MapPin, Navigation, Clock, Phone, Car, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Location = () => {
  const locationDetails = {
    address: "Jl. Kayu Manis No. 123, Jakarta Timur, DKI Jakarta 13220",
    coordinates: "-6.2088, 106.8456", // Jakarta coordinates as example
    googleMapsUrl: "https://maps.google.com/?q=-6.2088,106.8456"
  };

  const transportOptions = [
    {
      icon: <Car className="w-6 h-6 text-primary" />,
      title: "Kendaraan Pribadi",
      description: "Parkir luas tersedia di area depan dan samping gudang",
      details: ["Area parkir mobil: 20 slot", "Area parkir motor: 50 slot", "Gratis untuk pelanggan"]
    },
    {
      icon: <Bus className="w-6 h-6 text-primary" />,
      title: "Transportasi Umum",
      description: "Akses mudah dengan berbagai transportasi umab",
      details: ["Bus Transjakarta: Halte Kayu Manis", "KRL: Stasiun Jatinegara (15 menit)", "Ojek online tersedia"]
    }
  ];

  const nearbyLandmarks = [
    { name: "Mall Tamini Square", distance: "1.2 km", direction: "Utara" },
    { name: "Pasar Kayu Putih", distance: "800 m", direction: "Timur" },
    { name: "RS Premiere Jatinegara", distance: "2.1 km", direction: "Barat" },
    { name: "Masjid Al-Ikhlas", distance: "500 m", direction: "Selatan" }
  ];

  const businessHours = [
    { day: "Senin - Jumat", hours: "08:00 - 17:00 WIB", status: "Buka" },
    { day: "Sabtu", hours: "08:00 - 15:00 WIB", status: "Buka" },
    { day: "Minggu", hours: "Tutup", status: "Tutup" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Lokasi & Petunjuk Arah
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kunjungi gudang dan showroom kami untuk melihat langsung kualitas kayu premium 
            yang tersedia atau konsultasi dengan tim ahli kami
          </p>
        </div>

        {/* Main Location Card */}
        <Card className="mb-8 bg-gradient-card shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <MapPin className="w-6 h-6 text-primary" />
              UD Sumberjaya - Gudang & Showroom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Alamat Lengkap</h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  {locationDetails.address}
                </p>
                
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-wood hover:opacity-90"
                    onClick={() => window.open(locationDetails.googleMapsUrl, '_blank')}
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Buka di Google Maps
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://wa.me/6281234567890?text=Halo, saya ingin mendapatkan petunjuk arah ke UD Sumberjaya', '_blank')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Telepon
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(locationDetails.address)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Salin Alamat
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Jam Operasional
                </h3>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <div className="text-right">
                        <span className="font-medium text-foreground block">{schedule.hours}</span>
                        <span className={`text-xs ${schedule.status === 'Buka' ? 'text-accent' : 'text-destructive'}`}>
                          {schedule.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transportation */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {transportOptions.map((transport, index) => (
            <Card key={index} className="bg-gradient-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {transport.icon}
                  {transport.title}
                </CardTitle>
                <p className="text-muted-foreground">{transport.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {transport.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Nearby Landmarks */}
        <Card className="mb-8 bg-gradient-card">
          <CardHeader>
            <CardTitle>Landmark Terdekat</CardTitle>
            <p className="text-muted-foreground">
              Gunakan landmark berikut sebagai patokan untuk memudahkan perjalanan Anda
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {nearbyLandmarks.map((landmark, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <div>
                    <h4 className="font-medium text-foreground">{landmark.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {landmark.distance} ke arah {landmark.direction}
                    </p>
                  </div>
                  <div className="text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ingin Berkunjung Langsung?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Hubungi kami terlebih dahulu untuk memastikan ketersediaan stok dan 
            mendapatkan layanan konsultasi yang optimal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.open('https://wa.me/6281234567890?text=Halo, saya berencana berkunjung ke UD Sumberjaya. Apakah bisa membuat janji temu?', '_blank')}
            >
              Buat Janji Temu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => window.open('tel:+6281234567890')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Telepon Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;