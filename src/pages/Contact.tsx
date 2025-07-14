import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Telepon",
      details: ["+62 812-3456-7890", "+62 21-1234-5678"],
      action: "tel:+6281234567890"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "WhatsApp",
      details: ["+62 812-3456-7890"],
      action: "https://wa.me/6281234567890"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      details: ["info@udsumberjaya.com", "sales@udsumberjaya.com"],
      action: "mailto:info@udsumberjaya.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Alamat",
      details: ["Jl. Kayu Manis No. 123", "Jakarta Timur, DKI Jakarta 13220"],
      action: "/location"
    }
  ];

  const businessHours = [
    { day: "Senin - Jumat", hours: "08:00 - 17:00 WIB" },
    { day: "Sabtu", hours: "08:00 - 15:00 WIB" },
    { day: "Minggu", hours: "Tutup" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah dikirim. Tim kami akan segera menghubungi Anda.");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tim kami siap membantu Anda dengan konsultasi produk, pemesanan, 
            atau pertanyaan lainnya. Jangan ragu untuk menghubungi kami!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-card shadow-wood">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Jam Operasional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{schedule.day}</span>
                    <span className="font-medium text-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card cursor-pointer"
                      onClick={() => {
                        if (info.action.startsWith('http') || info.action.startsWith('tel:') || info.action.startsWith('mailto:')) {
                          window.open(info.action, '_blank');
                        } else {
                          window.location.href = info.action;
                        }
                      }}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-wood">
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
                <p className="text-muted-foreground">
                  Isi form di bawah ini dan kami akan merespons dalam 24 jam
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nama Lengkap *
                      </label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Nomor Telepon *
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Masukkan nomor telepon"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan alamat email"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subjek *
                    </label>
                    <Input
                      id="subject"
                      placeholder="Topik pesan Anda"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Pesan *
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tuliskan pesan atau pertanyaan Anda..."
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-wood hover:opacity-90">
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Butuh Respon Cepat?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Hubungi kami langsung melalui WhatsApp untuk mendapatkan respon yang lebih cepat
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.open('https://wa.me/6281234567890?text=Halo, saya ingin berkonsultasi tentang produk kayu UD Sumberjaya', '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;