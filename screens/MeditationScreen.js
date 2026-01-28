import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MeditationScreen = ({ navigation }) => {
  // State untuk melacak item audio mana yang "sedang diputar"
  const [playingId, setPlayingId] = useState(null);

  // Daftar audio meditasi contoh
  const meditationList = [
    { id: '1', title: 'Pernapasan 3 Menit', duration: '3:00', icon: 'leaf' },
    { id: '2', title: 'Relaksasi Tubuh', duration: '10:00', icon: 'body' },
    { id: '3', title: 'Fokus & Konsentrasi', duration: '7:00', icon: 'eye' },
    { id: '4', title: 'Tidur Nyenyak', duration: '15:00', icon: 'moon' },
    { id: '5', title: 'Mengurangi Kecemasan', duration: '12:00', icon: 'water' },
  ];

  // Fungsi untuk menangani "pemutaran"
  const handlePlayPress = (itemId, itemTitle) => {
    if (playingId === itemId) {
      // Jika item yang sama ditekan lagi, anggap "pause"
      setPlayingId(null);
      alert(`Memberhentikan: ${itemTitle}`);
    } else {
      // Putar item baru
      setPlayingId(itemId);
      alert(`Memutar: ${itemTitle}\nDurasi: ${meditationList.find(item => item.id === itemId)?.duration}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      
      {/* Custom Header dengan Tombol Kembali */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Fungsi untuk kembali
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditasi</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Deskripsi */}
        <View style={styles.descriptionCard}>
          <Ionicons name="headset" size={50} color="#4A90E2" />
          <Text style={styles.descriptionTitle}>Panduan Meditasi Audio</Text>
          <Text style={styles.descriptionText}>
            Pilih sesi meditasi untuk menenangkan pikiran, mengurangi stres, dan meningkatkan fokus. 
            Dengarkan dengan headphone untuk pengalaman terbaik.
          </Text>
        </View>

        {/* Daftar Meditasi */}
        <Text style={styles.sectionTitle}>Rekomendasi untuk Anda</Text>
        {meditationList.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.meditationItem}
            onPress={() => handlePlayPress(item.id, item.title)} // Panggil fungsi baru
          >
            <View style={styles.meditationIcon}>
              <Ionicons name={item.icon} size={28} color="#4A90E2" />
            </View>
            <View style={styles.meditationInfo}>
              <Text style={styles.meditationTitle}>{item.title}</Text>
              <Text style={styles.meditationDuration}>{item.duration}</Text>
            </View>
            {/* Ikon berubah antara 'play' dan 'pause' */}
            <Ionicons 
              name={playingId === item.id ? "pause-circle" : "play-circle"} 
              size={32} 
              color="#27AE60" 
            />
          </TouchableOpacity>
        ))}

        {/* Tip */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={22} color="#F39C12" />
          <Text style={styles.tipText}>
            Cobalah bermeditasi 10 menit setiap hari untuk manfaat terbaik.
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
    justifyContent: 'space-between',
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRightPlaceholder: {
    width: 32, // Untuk membuat judul tetap di tengah
  },
  content: {
    flex: 1,
    padding: 20,
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  meditationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  meditationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  meditationInfo: {
    flex: 1,
  },
  meditationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  meditationDuration: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#F39C12',
    marginLeft: 10,
    fontWeight: '500',
  },
});

export default MeditationScreen;