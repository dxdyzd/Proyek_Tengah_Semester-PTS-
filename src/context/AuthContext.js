import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('userRole');
        const data = await AsyncStorage.getItem('userData');
        
        if (token) {
          setUserToken(token);
          setUserRole(role);
          setUserData(data ? JSON.parse(data) : null);
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const signIn = async (userData) => {
    try {
      const token = `token-${Date.now()}`;
      const role = userData.email.includes('admin') ? 'admin' : 'user';
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      setUserToken(token);
      setUserRole(role);
      setUserData(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signUp = async (userData) => {
    try {
      const token = `token-${Date.now()}`;
      const role = 'user'; // Default role untuk registrasi
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      setUserToken(token);
      setUserRole(role);
      setUserData(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userData');
      
      setUserToken(null);
      setUserRole(null);
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const newData = { ...userData, ...updatedData };
      await AsyncStorage.setItem('userData', JSON.stringify(newData));
      setUserData(newData);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider value={{
      userToken,
      userRole,
      userData,
      isLoading,
      signIn,
      signUp,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};