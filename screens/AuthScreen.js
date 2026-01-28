import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { signIn, signUp } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validasi form
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Email dan password harus diisi');
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        Alert.alert('Error', 'Nama lengkap harus diisi');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Password dan konfirmasi password tidak cocok');
        return;
      }
      if (formData.password.length < 6) {
        Alert.alert('Error', 'Password minimal 6 karakter');
        return;
      }
    }

    try {
      let result;
      if (isLogin) {
        // Login
        result = await signIn({
          email: formData.email,
          password: formData.password,
          lastLogin: new Date().toISOString(),
        });
        
        if (result.success) {
          Alert.alert('Berhasil', 'Login berhasil!');
        }
      } else {
        // Register
        result = await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          createdAt: new Date().toISOString(),
        });
        
        if (result.success) {
          Alert.alert('Berhasil', 'Registrasi berhasil!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan, silakan coba lagi');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="leaf" size={70} color="#4A90E2" />
            <Text style={styles.appTitle}>🌱 MindGrow</Text>
            <Text style={styles.appSubtitle}>Pendamping Kesehatan Mental Remaja</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
            </Text>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="nama@email.com"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Konfirmasi Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  secureTextEntry
                />
              </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>
                {isLogin ? 'Masuk' : 'Daftar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.switchMode}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
              </Text>
            </TouchableOpacity>

            {/* Demo Accounts */}
            <View style={styles.demoSection}>
              <Text style={styles.demoTitle}>Akun Demo:</Text>
              <Text style={styles.demoText}>• User: user@mindgrow.com (password: 123456)</Text>
              <Text style={styles.demoText}>• Admin: admin@mindgrow.com (password: 123456)</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#ECF0F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2C3E50',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchMode: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  switchText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600',
  },
  demoSection: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#E8F4FD',
    borderRadius: 10,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  demoText: {
    fontSize: 12,
    color: '#5D6D7E',
    lineHeight: 18,
  },
});

export default AuthScreen;