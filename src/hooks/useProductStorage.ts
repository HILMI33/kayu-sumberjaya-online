import { useState, useEffect } from 'react';
import { Product, sampleProducts } from '@/data/products';

const STORAGE_KEY = 'ud_sumberjaya_products';

export const useProductStorage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error parsing saved products:', error);
        // If there's an error, use sample products
        setProducts(sampleProducts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProducts));
      }
    } else {
      // If no saved products, use sample products
      setProducts(sampleProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now() // Simple ID generation
    };
    const newProducts = [...products, newProduct];
    saveProducts(newProducts);
    return newProduct;
  };

  const updateProduct = (id: number, productData: Omit<Product, 'id'>) => {
    const newProducts = products.map(product =>
      product.id === id ? { ...productData, id } : product
    );
    saveProducts(newProducts);
    return newProducts.find(p => p.id === id);
  };

  const deleteProduct = (id: number) => {
    const newProducts = products.filter(product => product.id !== id);
    saveProducts(newProducts);
    return true;
  };

  const getProduct = (id: number) => {
    return products.find(product => product.id === id);
  };

  const resetToSampleData = () => {
    saveProducts(sampleProducts);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    resetToSampleData
  };
};