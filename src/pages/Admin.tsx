import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, RotateCcw, UserPlus, Users, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { useProductStorage } from "@/hooks/useProductStorage";
import { useAdminStorage } from "@/hooks/useAdminStorage";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  
  // Use the custom hooks
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetToSampleData 
  } = useProductStorage();

  const {
    admins,
    addAdmin,
    deleteAdmin,
    authenticateAdmin
  } = useAdminStorage();

  // Authentication using admin storage
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const admin = authenticateAdmin(username, password);
      if (admin) {
        setIsAuthenticated(true);
        setCurrentAdmin(admin);
        toast({
          title: "Login berhasil",
          description: `Selamat datang ${admin.username}!`,
        });
      } else {
        toast({
          title: "Login gagal",
          description: "Username atau password salah",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentAdmin(null);
    setUsername("");
    setPassword("");
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari panel admin",
    });
  };

  const handleSaveProduct = (productData: any) => {
    try {
      if (editingProduct) {
        // Update existing product
        updateProduct(editingProduct.id, productData);
        toast({
          title: "Produk berhasil diupdate",
          description: `${productData.name} telah diperbarui`,
        });
      } else {
        // Add new product
        addProduct(productData);
        toast({
          title: "Produk berhasil ditambahkan",
          description: `${productData.name} telah ditambahkan`,
        });
      }
      setEditingProduct(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan produk",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        deleteProduct(id);
        toast({
          title: "Produk berhasil dihapus",
          description: "Produk telah dihapus dari database",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat menghapus produk",
          variant: "destructive",
        });
      }
    }
  };

  const handleResetData = () => {
    if (confirm("Apakah Anda yakin ingin mereset semua data ke data awal?")) {
      resetToSampleData();
      toast({
        title: "Data berhasil direset",
        description: "Semua data telah dikembalikan ke data sample",
      });
    }
  };

  const handleAddAdmin = (adminData: any) => {
    try {
      addAdmin(adminData);
      toast({
        title: "Admin berhasil ditambahkan",
        description: `Admin ${adminData.username} telah ditambahkan`,
      });
      setIsAdminDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan saat menambah admin",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAdmin = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus admin ini?")) {
      try {
        deleteAdmin(id);
        toast({
          title: "Admin berhasil dihapus",
          description: "Admin telah dihapus dari sistem",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Terjadi kesalahan saat menghapus admin",
          variant: "destructive",
        });
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/20">
        <Card className="w-full max-w-md bg-gradient-card shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Admin Login</CardTitle>
            <p className="text-muted-foreground">Masuk ke panel admin UD Sumberjaya</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-wood hover:opacity-90">
                Login
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Demo: username "admin", password "admin123"
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Panel Admin</h1>
            <p className="text-muted-foreground">
              Selamat datang, {currentAdmin?.username}! | Kelola UD Sumberjaya
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Produk</p>
                  <p className="text-2xl font-bold text-primary">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Stok</p>
                  <p className="text-2xl font-bold text-primary">
                    {products.reduce((sum, p) => sum + p.stock, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Kategori</p>
                  <p className="text-2xl font-bold text-primary">{categories.length - 1}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Admin</p>
                  <p className="text-2xl font-bold text-primary">{admins.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Kelola Produk
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Kelola Admin
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="bg-gradient-card shadow-wood">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Daftar Produk</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleResetData}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Data
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-gradient-wood hover:opacity-90"
                          onClick={() => {
                            setEditingProduct(null);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Tambah Produk
                        </Button>
                      </DialogTrigger>
                      <ProductDialog
                        product={editingProduct}
                        onSave={handleSaveProduct}
                        onClose={() => setIsDialogOpen(false)}
                      />
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsDialogOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admins Tab */}
          <TabsContent value="admins">
            <Card className="bg-gradient-card shadow-wood">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Daftar Admin</CardTitle>
                  <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-wood hover:opacity-90">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Tambah Admin
                      </Button>
                    </DialogTrigger>
                    <AdminDialog
                      onSave={handleAddAdmin}
                      onClose={() => setIsAdminDialogOpen(false)}
                    />
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Tanggal Dibuat</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell className="font-medium">{admin.username}</TableCell>
                          <TableCell>
                            {new Date(admin.createdAt).toLocaleDateString('id-ID')}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              admin.isDefault 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-accent/10 text-accent'
                            }`}>
                              {admin.isDefault ? 'Default' : 'Custom'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {!admin.isDefault && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteAdmin(admin.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              )}
                              {admin.isDefault && (
                                <span className="text-xs text-muted-foreground px-2 py-1">
                                  Tidak dapat dihapus
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Product Dialog Component
const ProductDialog = ({ product, onSave, onClose }: any) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || categories[1],
    stock: product?.stock || 0,
    image: product?.image || "/api/placeholder/300/200"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {product ? "Edit Produk" : "Tambah Produk Baru"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Produk
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Masukkan nama produk"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Kategori
          </label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Harga (IDR)
            </label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              placeholder="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Stok
            </label>
            <Input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              placeholder="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Deskripsi
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Masukkan deskripsi produk"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            URL Gambar
          </label>
          <Input
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1 bg-gradient-wood hover:opacity-90">
            {product ? "Update" : "Tambah"} Produk
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

// Admin Dialog Component
const AdminDialog = ({ onSave, onClose }: any) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username.trim() && formData.password.trim()) {
      onSave(formData);
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Tambah Admin Baru</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Buat akun admin baru untuk mengakses panel admin
        </p>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Username *
          </label>
          <Input
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Masukkan username"
            required
            minLength={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Minimal 3 karakter, harus unik
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password *
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Masukkan password"
              required
              minLength={6}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Minimal 6 karakter
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1 bg-gradient-wood hover:opacity-90">
            <UserPlus className="w-4 h-4 mr-2" />
            Tambah Admin
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default Admin;