import React, { useMemo, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GAIA_MASCOT = require('../../assets/ui/gaiamascot.jpg');

type ChatMessage = {
  role: 'assistant' | 'user' | 'upsell';
  content: string;
};

const MOCK_REPLIES = [
  'A modern Mediterranean garden would fit this app nicely. I would start with layered planting, warm stone, and a defined lounge zone.',
  'For a cleaner layout, try grouping your planting beds into fewer larger shapes and add one focal feature such as a fire pit or water element.',
];

export function ChatScreen({ navigation }: any) {
  const [input, setInput] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Gardener. You can ask me anything about gardens, plants, trees, watering, care, and landscaping. 🌿",
    },
  ]);
  const insets = useSafeAreaInsets();

  const canReply = useMemo(() => replyCount < 2, [replyCount]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setInput('');

    if (canReply) {
      const reply = MOCK_REPLIES[replyCount] ?? MOCK_REPLIES[MOCK_REPLIES.length - 1];
      setMessages([...nextMessages, { role: 'assistant', content: reply }]);
      setReplyCount((current) => current + 1);
      return;
    }

    setMessages([
      ...nextMessages,
      {
        role: 'upsell',
        content: 'You need to be a PRO member to use this feature. 🌿',
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}
    >
      <View style={[styles.sheet, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.sheetHandle} />
        <View style={styles.headerRow}>
          <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => {
            if (item.role === 'user') {
              return (
                <View style={styles.userWrap}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userText}>{item.content}</Text>
                  </View>
                </View>
              );
            }

            return (
              <View style={styles.assistantRow}>
                <View style={styles.avatarWrap}>
                  <Image source={GAIA_MASCOT} style={styles.avatarImage} resizeMode="cover" />
                </View>
                <View style={item.role === 'upsell' ? styles.upsellBubble : styles.assistantBubble}>
                  {item.role === 'assistant' && <Text style={styles.assistantName}>Gardener</Text>}
                  <Text style={styles.assistantText}>{item.content}</Text>
                  {item.role === 'upsell' && (
                    <Pressable style={styles.inlineProButton} onPress={() => navigation.navigate('Paywall', { source: 'app' })}>
                      <Text style={styles.inlineProText}>PRO</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          }}
        />

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Message"
            value={input}
            onChangeText={setInput}
            style={styles.input}
            placeholderTextColor="#9a9a9a"
            onSubmitEditing={send}
            returnKeyType="send"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  sheet: {
    minHeight: '86%',
    maxHeight: '96%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 14,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 52,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#d3d3d3',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#9b9b9b',
    fontSize: 18,
  },
  messageList: {
    paddingTop: 8,
    paddingBottom: 12,
    gap: 14,
  },
  userWrap: {
    alignItems: 'flex-end',
  },
  userBubble: {
    maxWidth: '76%',
    backgroundColor: '#244f2e',
    borderRadius: 18,
    borderTopRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  userText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
  },
  assistantRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  avatarWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  assistantBubble: {
    maxWidth: '80%',
    backgroundColor: '#f1f1f1',
    borderRadius: 18,
    borderTopLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  assistantName: {
    color: '#456140',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  assistantText: {
    color: '#4a4a4a',
    fontSize: 16,
    lineHeight: 23,
  },
  upsellBubble: {
    maxWidth: '80%',
    backgroundColor: '#fff3dd',
    borderRadius: 18,
    borderTopLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inlineProButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: '#2f6837',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inlineProText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  inputWrap: {
    paddingTop: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#222',
  },
});
