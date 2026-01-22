import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Selamat Pagi 👋</Text>
            <Text style={styles.username}>M Ihsan Hidayatullah</Text>
          </View>
          <TouchableOpacity 
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle" size={45} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Statistik Minggu Ini</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={24} color="#4A90E2" />
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Hari Streak</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Ionicons name="trending-up" size={24} color="#50E3C2" />
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Mood Positif</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Ionicons name="time" size={24} color="#FF6B6B" />
              <Text style={styles.statNumber}>28m</Text>
              <Text style={styles.statLabel}>Meditasi</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Aksi Cepat</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#4A90E2' }]}
            onPress={() => navigation.navigate('Mood')}
          >
            <Ionicons name="happy-outline" size={32} color="#FFF" />
            <Text style={styles.actionText}>Cek Mood</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#FF6B6B' }]}
            onPress={() => navigation.navigate('Chat')}
          >
            <Ionicons name="chatbubble-outline" size={32} color="#FFF" />
            <Text style={styles.actionText}>Chat AI</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#50E3C2' }]}>
            <Ionicons name="musical-notes" size={32} color="#FFF" />
            <Text style={styles.actionText}>Meditasi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#9B59B6' }]}>
            <Ionicons name="journal" size={32} color="#FFF" />
            <Text style={styles.actionText}>Jurnal</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={24} color="#F39C12" />
            <Text style={styles.tipTitle}>Tips Hari Ini</Text>
          </View>
          <Text style={styles.tipText}>
            "Luangkan 5 menit untuk bernapas dalam-dalam. Fokus pada napas dapat mengurangi stres hingga 40%."
          </Text>
          <TouchableOpacity style={styles.tipButton}>
            <Text style={styles.tipButtonText}>Pelajari Lebih Lanjut</Text>
            <Ionicons name="arrow-forward" size={16} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>
        <View style={styles.activityList}>
          {[
            { icon: 'checkmark-circle', color: '#27AE60', text: 'Mood tracker selesai', time: '10:30 AM' },
            { icon: 'chatbubble', color: '#4A90E2', text: 'Chat dengan AI', time: '09:15 AM' },
            { icon: 'time', color: '#9B59B6', text: 'Meditasi 5 menit', time: '07:45 AM' },
            { icon: 'trophy', color: '#F39C12', text: 'Streak 7 hari!', time: 'Kemarin' },
          ].map((item, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>{item.text}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
            </View>
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#ECF0F1',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 10,
    fontSize: 14,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 22,
    marginBottom: 15,
  },
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipButtonText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 5,
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 2,
  },
});

export default HomeScreen;