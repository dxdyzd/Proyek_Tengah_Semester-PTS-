import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MoodScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState('');

  const moods = [
    { emoji: '😊', label: 'Sangat Bahagia', color: '#27AE60' },
    { emoji: '🙂', label: 'Bahagia', color: '#2ECC71' },
    { emoji: '😐', label: 'Biasa Saja', color: '#F39C12' },
    { emoji: '😔', label: 'Sedih', color: '#E74C3C' },
    { emoji: '😢', label: 'Sangat Sedih', color: '#C0392B' },
  ];

  const handleSubmit = () => {
    if (selectedMood !== null) {
      Alert.alert(
        'Mood Disimpan!',
        `Mood "${moods[selectedMood].label}" telah disimpan!${
          journalText ? '\nDengan catatan: ' + journalText : ''
        }`
      );
      setSelectedMood(null);
      setJournalText('');
    } else {
      Alert.alert('Peringatan', 'Pilih mood terlebih dahulu!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>📊 Mood Tracker</Text>
            <Text style={styles.subtitle}>Catat perasaanmu hari ini</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Mood Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bagaimana perasaanmu hari ini?</Text>
          <View style={styles.moodGrid}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodCard,
                  { borderColor: mood.color },
                  selectedMood === index && {
                    backgroundColor: mood.color + '20',
                  },
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={[styles.moodEmoji, { fontSize: 40 }]}>
                  {mood.emoji}
                </Text>
                <Text style={[styles.moodLabel, { color: mood.color }]}>
                  {mood.label}
                </Text>
                {selectedMood === index && (
                  <View
                    style={[
                      styles.selectedIndicator,
                      { backgroundColor: mood.color },
                    ]}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Journal Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tambahkan catatan (opsional)</Text>
          <View style={styles.journalContainer}>
            <View style={styles.journalHeader}>
              <Ionicons name="journal" size={20} color="#4A90E2" />
              <Text style={styles.journalTitle}>Jurnal Harian</Text>
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.placeholderText}>
                {journalText === ''
                  ? 'Apa yang membuatmu merasa seperti ini hari ini?'
                  : journalText}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addNoteButton}
              onPress={() =>
                Alert.alert(
                  'Informasi',
                  'Fitur jurnal lengkap akan segera hadir!'
                )
              }
            >
              <Text style={styles.addNoteText}>+ Tambah Catatan Lengkap</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mood History */}
        <View style={styles.section}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Riwayat Minggu Ini</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.historyChart}>
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(
              (day, index) => (
                <View key={index} style={styles.dayColumn}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.random() * 60 + 20,
                          backgroundColor:
                            ['#27AE60', '#2ECC71', '#F39C12', '#E74C3C'][
                              index % 4
                            ],
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.moodEmojiSmall}>
                    {['😊', '🙂', '😐', '😔', '😊', '🙂', '😐'][index]}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedMood === null && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selectedMood === null}
        >
          <Text style={styles.submitButtonText}>
            {selectedMood === null
              ? 'Pilih Mood Terlebih Dahulu'
              : 'Simpan Mood Hari Ini'}
          </Text>
          {selectedMood !== null && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          )}
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  dateContainer: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodCard: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  moodEmoji: {
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  journalContainer: {
    borderWidth: 1,
    borderColor: '#ECF0F1',
    borderRadius: 12,
    padding: 15,
  },
  journalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  journalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  textInputContainer: {
    minHeight: 100,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#BDC3C7',
    fontStyle: 'italic',
  },
  addNoteButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 8,
  },
  addNoteText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  historyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  barContainer: {
    height: 60,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  moodEmojiSmall: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoodScreen;