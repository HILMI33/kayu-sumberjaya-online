import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onWhatsAppOrder: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails, onWhatsAppOrder }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-2 right-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-card/90 backdrop-blur-sm hover:bg-card"
                onClick={() => onViewDetails(product)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="absolute top-2 left-2">
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              Stok: {product.stock}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onWhatsAppOrder(product)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0 ? "Stok Habis" : "Pesan via WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;