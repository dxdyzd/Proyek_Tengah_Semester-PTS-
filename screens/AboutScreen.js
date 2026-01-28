import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header dengan tombol kembali */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tentang Aplikasi</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={80} color="#4A90E2" />
          <Text style={styles.appName}>MindGrow</Text>
          <Text style={styles.version}>Versi 1.0.0</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Deskripsi Aplikasi</Text>
          <Text style={styles.description}>
            MindGrow adalah aplikasi pendamping kesehatan mental dan pengembangan karakter berbasis AI yang dirancang khusus untuk remaja.
            Aplikasi ini membantu pengguna mengelola stres, membangun kebiasaan mindful, serta melatih nilai karakter seperti resiliensi, empati, dan regulasi diri.
          </Text>
          
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          {[
            'Chatbot Pendamping AI dengan respons empatik',
            'Pelacakan mood dan jurnal harian',
            'Library konten mindfulness (audio, artikel)',
            'Dashboard perkembangan pribadi',
            'Panel admin untuk psikolog/konselor'
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          
          <Text style={styles.sectionTitle}>Pengembang</Text>
          <View style={styles.developerInfo}>
            <Ionicons name="person" size={20} color="#4A90E2" />
            <Text style={styles.developerText}>M Ihsan Hidayatullah</Text>
          </View>
          <View style={styles.developerInfo}>
            <Ionicons name="school" size={20} color="#4A90E2" />
            <Text style={styles.developerText}>XII SIJA 2 - SMK Telkom Sidoarjo</Text>
          </View>
          <View style={styles.developerInfo}>
            <Ionicons name="calendar" size={20} color="#4A90E2" />
            <Text style={styles.developerText}>Proyek Tengah Semester - Januari 2026</Text>
          </View>
        </View>
        
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Aplikasi ini dikembangkan untuk memenuhi tugas proyek Smart Life App yang berfokus pada gaya hidup sehat, beretika, dan berkarakter berbasis AI.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  backButton: {
    padding: 4,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
  },
  version: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 10,
    flex: 1,
  },
  developerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  developerText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 10,
  },
  footerNote: {
    backgroundColor: '#E8F4FD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 13,
    color: '#4A90E2',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default AboutScreen;