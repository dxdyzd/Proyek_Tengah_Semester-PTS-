import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalScreen = ({ navigation }) => {
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalHistory, setJournalHistory] = useState([]);

  const moodOptions = [
    { emoji: '😊', label: 'Senang', color: '#27AE60' },
    { emoji: '😌', label: 'Tenang', color: '#3498DB' },
    { emoji: '😐', label: 'Biasa', color: '#F39C12' },
    { emoji: '😔', label: 'Sedih', color: '#E74C3C' },
    { emoji: '😴', label: 'Lelah', color: '#9B59B6' },
  ];

  const saveJournal = async () => {
    if (!journalEntry.trim()) {
      Alert.alert('Peringatan', 'Tuliskan sesuatu di jurnalmu terlebih dahulu.');
      return;
    }
    if (!selectedMood) {
      Alert.alert('Peringatan', 'Pilih mood-mu terlebih dahulu.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      text: journalEntry,
      mood: selectedMood,
    };

    try {
      const existingHistory = await AsyncStorage.getItem('journalHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      const updatedHistory = [newEntry, ...history];
      await AsyncStorage.setItem('journalHistory', JSON.stringify(updatedHistory));
      
      setJournalHistory(updatedHistory);
      setJournalEntry('');
      setSelectedMood(null);
      Alert.alert('Sukses!', 'Jurnal berhasil disimpan.');
    } catch (error) {
      console.error('Gagal menyimpan jurnal:', error);
      Alert.alert('Error', 'Gagal menyimpan jurnal.');
    }
  };

  const loadJournalHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('journalHistory');
      if (savedHistory) {
        setJournalHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Gagal memuat riwayat:', error);
    }
  };

  React.useEffect(() => {
    loadJournalHistory();
  }, []);

  const renderJournalItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <View style={[styles.moodBadge, { backgroundColor: `${item.mood.color}20` }]}>
          <Text style={[styles.moodEmoji, { color: item.mood.color }]}>{item.mood.emoji}</Text>
          <Text style={[styles.moodLabel, { color: item.mood.color }]}>{item.mood.label}</Text>
        </View>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <Text style={styles.historyText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      
      {/* Custom Header dengan Tombol Kembali */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Fungsi kembali ke HomeScreen
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Jurnal Pribadi</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Input Area */}
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Bagaimana hari ini?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Tuliskan apa yang kamu pikirkan atau rasakan..."
              placeholderTextColor="#95A5A6"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={journalEntry}
              onChangeText={setJournalEntry}
            />
            
            {/* Mood Selection */}
            <Text style={styles.moodLabel}>Pilih Mood:</Text>
            <View style={styles.moodContainer}>
              {moodOptions.map((mood) => (
                <TouchableOpacity
                  key={mood.label}
                  style={[
                    styles.moodButton,
                    selectedMood?.label === mood.label && { 
                      backgroundColor: `${mood.color}20`,
                      borderColor: mood.color 
                    }
                  ]}
                  onPress={() => setSelectedMood(mood)}
                >
                  <Text style={[styles.moodEmoji, { fontSize: 24 }]}>{mood.emoji}</Text>
                  <Text style={[styles.moodText, { color: mood.color }]}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveJournal}>
              <Ionicons name="save" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Simpan Jurnal</Text>
            </TouchableOpacity>
          </View>

          {/* History Section */}
          <View style={styles.historyCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={20} color="#7F8C8D" />
              <Text style={styles.historyTitle}>Riwayat Jurnal</Text>
              <Text style={styles.historyCount}>{journalHistory.length} entri</Text>
            </View>
            
            {journalHistory.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="document-text" size={50} color="#ECF0F1" />
                <Text style={styles.emptyStateText}>Belum ada entri jurnal</Text>
                <Text style={styles.emptyStateSubtext}>Mulailah dengan menulis jurnal pertama Anda!</Text>
              </View>
            ) : (
              <FlatList
                data={journalHistory}
                renderItem={renderJournalItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            )}
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
    width: 32,
  },
  content: {
    flex: 1,
    paddingTop: 15,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ECF0F1',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
    minHeight: 150,
    marginBottom: 20,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    marginBottom: 10,
  },
  moodEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  moodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 30,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
    flex: 1,
  },
  historyCount: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '600',
    marginTop: 15,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  historyItem: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  historyDate: {
    fontSize: 12,
    color: '#95A5A6',
    marginLeft: 'auto',
  },
  historyText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginTop: 10,
  },
});

export default JournalScreen;