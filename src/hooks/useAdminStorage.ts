import { useState, useEffect } from 'react';

export interface Admin {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  isDefault?: boolean; // untuk admin default yang tidak bisa dihapus
}

const ADMIN_STORAGE_KEY = 'ud_sumberjaya_admins';

const defaultAdmins: Admin[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    createdAt: new Date().toISOString(),
    isDefault: true
  }
];

export const useAdminStorage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  // Load admins from localStorage on component mount
  useEffect(() => {
    const savedAdmins = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (savedAdmins) {
      try {
        const parsedAdmins = JSON.parse(savedAdmins);
        setAdmins(parsedAdmins);
      } catch (error) {
        console.error('Error parsing saved admins:', error);
        // If there's an error, use default admins
        setAdmins(defaultAdmins);
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(defaultAdmins));
      }
    } else {
      // If no saved admins, use default admins
      setAdmins(defaultAdmins);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(defaultAdmins));
    }
  }, []);

  // Save admins to localStorage whenever admins change
  const saveAdmins = (newAdmins: Admin[]) => {
    setAdmins(newAdmins);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(newAdmins));
  };

  const addAdmin = (adminData: Omit<Admin, 'id' | 'createdAt'>) => {
    // Check if username already exists
    const existingAdmin = admins.find(admin => admin.username === adminData.username);
    if (existingAdmin) {
      throw new Error('Username sudah digunakan');
    }

    const newAdmin: Admin = {
      ...adminData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const newAdmins = [...admins, newAdmin];
    saveAdmins(newAdmins);
    return newAdmin;
  };

  const deleteAdmin = (id: number) => {
    // Prevent deleting default admin
    const adminToDelete = admins.find(admin => admin.id === id);
    if (adminToDelete?.isDefault) {
      throw new Error('Admin default tidak dapat dihapus');
    }

    const newAdmins = admins.filter(admin => admin.id !== id);
    saveAdmins(newAdmins);
    return true;
  };

  const authenticateAdmin = (username: string, password: string) => {
    return admins.find(admin => 
      admin.username === username && admin.password === password
    );
  };

  const changePassword = (id: number, newPassword: string) => {
    const newAdmins = admins.map(admin =>
      admin.id === id ? { ...admin, password: newPassword } : admin
    );
    saveAdmins(newAdmins);
    return true;
  };

  return {
    admins,
    addAdmin,
    deleteAdmin,
    authenticateAdmin,
    changePassword
  };
};