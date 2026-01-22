import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Halo! Saya AI pendamping MindGrow. Saya di sini untuk mendengarkan dan mendukungmu. Bagaimana perasaanmu hari ini?',
      fromAI: true,
      time: '09:00',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Tambahkan pesan pengguna
    const newUserMessage = {
      id: Date.now().toString(),
      text: inputText,
      fromAI: false,
      time: new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulasi respons AI setelah 1-2 detik
    setTimeout(() => {
      const aiResponses = [
        'Saya mengerti apa yang kamu rasakan. Terima kasih sudah berbagi perasaanmu dengan saya.',
        'Itu pasti sulit untukmu. Ingat, perasaan ini bersifat sementara dan kamu lebih kuat dari yang kamu kira.',
        'Mari kita coba tarik napas dalam-dalam bersama. Tarik napas... tahan... buang napas. Ulangi 3 kali.',
        'Apakah kamu ingin mencoba teknik grounding? Sebutkan 5 hal yang bisa kamu lihat, 4 yang bisa kamu sentuh, 3 yang bisa kamu dengar, 2 yang bisa kamu cium, dan 1 yang bisa kamu rasakan.',
        'Terkadang menuliskan perasaan bisa membantu. Maukah kamu mencoba menulis jurnal singkat?',
        'Kamu tidak sendirian dalam perasaan ini. Banyak orang mengalami hal serupa, dan itu wajar.',
        'Sudahkah kamu minum air hari ini? Terkadang dehidrasi bisa mempengaruhi suasana hati.',
        'Cobalah untuk berjalan-jalan sebentar atau melihat ke luar jendela. Perubahan pemandangan bisa membantu.',
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const newAIMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        fromAI: true,
        time: new Date().toLocaleTimeString('id-ID', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, newAIMessage]);
    }, 1500);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.fromAI ? styles.aiMessageContainer : styles.userMessageContainer,
      ]}
    >
      {item.fromAI && (
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles" size={16} color="#4A90E2" />
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          item.fromAI ? styles.aiBubble : styles.userBubble,
        ]}
      >
        <Text style={item.fromAI ? styles.aiText : styles.userText}>
          {item.text}
        </Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );

  const quickReplies = [
    'Saya merasa sedih hari ini',
    'Bagaimana cara mengatasi stres?',
    'Saya butuh motivasi',
    'Teknik relaksasi apa yang efektif?',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.aiStatus}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>AI Pendamping Online</Text>
          </View>
          <Text style={styles.headerTitle}>MindGrow AI Assistant</Text>
          <Text style={styles.headerSubtitle}>
            Teman bicara yang empatik dan mendukung
          </Text>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        inverted={false}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingContainer}>
          <View style={styles.typingBubble}>
            <Text style={styles.typingText}>AI sedang mengetik</Text>
            <View style={styles.typingDots}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
          </View>
        </View>
      )}

      {/* Quick Replies */}
      <View style={styles.quickRepliesContainer}>
        <Text style={styles.quickRepliesTitle}>Balasan Cepat:</Text>
        <View style={styles.quickRepliesRow}>
          {quickReplies.map((reply, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickReplyButton}
              onPress={() => setInputText(reply)}
            >
              <Text style={styles.quickReplyText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ketik pesanmu di sini..."
          placeholderTextColor="#95A5A6"
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            inputText.trim() === '' && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={inputText.trim() === ''}
        >
          <Ionicons
            name="send"
            size={22}
            color={inputText.trim() === '' ? '#BDC3C7' : '#FFFFFF'}
          />
        </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    alignItems: 'center',
  },
  aiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#27AE60',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#E8F4FD',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
  },
  userBubble: {
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  aiText: {
    fontSize: 15,
    color: '#2C3E50',
    lineHeight: 20,
  },
  userText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 10,
    color: '#95A5A6',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  typingBubble: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginRight: 8,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7F8C8D',
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.8,
  },
  quickRepliesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  quickRepliesTitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
    fontWeight: '500',
  },
  quickRepliesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickReplyButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  quickReplyText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#ECF0F1',
  },
});

export default ChatScreen;