import React, { useMemo, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

const GAIA_MASCOT = require('../../assets/ui/gaiamascot.jpg');

type ChatMessage = {
  role: 'assistant' | 'user' | 'upsell';
  content: string;
};

const MOCK_REPLIES = [
  'A modern Mediterranean garden would fit this scene well. I would begin with layered planting, warm stone, and one defined lounge zone.',
  'For a cleaner composition, group the planting beds into fewer bold shapes and add one focal feature such as a fire bowl or water element.',
];

export function ChatScreen({ navigation }: any) {
  const [input, setInput] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi, I'm Gaia. Ask about plants, layouts, materials, or how to improve your garden." },
  ]);
  const insets = useSafeAreaInsets();
  const canReply = useMemo(() => replyCount < 2, [replyCount]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setInput('');

    if (canReply) {
      const reply = MOCK_REPLIES[replyCount] ?? MOCK_REPLIES[MOCK_REPLIES.length - 1];
      setMessages([...nextMessages, { role: 'assistant', content: reply }]);
      setReplyCount((current) => current + 1);
      return;
    }

    setMessages([...nextMessages, { role: 'upsell', content: 'PRO unlocks unlimited chat help and more detailed answers.' }]);
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}>
      <View style={[styles.sheet, { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.kicker}>Garden Assistant</Text>
            <Text style={styles.header}>Ask Gaia</Text>
          </View>
          <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={20} color={COLORS.textSecondary} />
          </Pressable>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) =>
            item.role === 'user' ? (
              <View style={styles.userWrap}>
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{item.content}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.assistantRow}>
                <Image source={GAIA_MASCOT} style={styles.avatarImage} resizeMode="contain" />
                <View style={item.role === 'upsell' ? styles.upsellBubble : styles.assistantBubble}>
                  {item.role === 'assistant' ? <Text style={styles.assistantName}>Gaia</Text> : null}
                  <Text style={styles.assistantText}>{item.content}</Text>
                  {item.role === 'upsell' ? (
                    <Pressable style={styles.inlineProButton} onPress={() => navigation.navigate('Paywall', { source: 'app' })}>
                      <Text style={styles.inlineProText}>View PRO</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
            )
          }
        />

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Ask about layout, planting, or materials"
            value={input}
            onChangeText={setInput}
            style={styles.input}
            placeholderTextColor={COLORS.textLight}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={send}>
            <MaterialCommunityIcons name="arrow-top-right" size={18} color={COLORS.white} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'flex-end' },
  sheet: { minHeight: '86%', maxHeight: '96%', backgroundColor: COLORS.background, borderTopLeftRadius: RADII.panel, borderTopRightRadius: RADII.panel, paddingHorizontal: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  header: { marginTop: 6, fontFamily: FONTS.display, fontSize: 28, color: COLORS.text },
  closeButton: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface, borderRadius: RADII.sm, borderWidth: 1, borderColor: COLORS.border },
  messageList: { paddingTop: 8, paddingBottom: 12, gap: 14 },
  userWrap: { alignItems: 'flex-end' },
  userBubble: { maxWidth: '78%', backgroundColor: COLORS.secondary, borderRadius: RADII.lg, paddingHorizontal: 16, paddingVertical: 14 },
  userText: { ...TYPE.body, color: COLORS.white },
  assistantRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  avatarImage: { width: 36, height: 36, marginBottom: 8 },
  assistantBubble: { maxWidth: '80%', backgroundColor: COLORS.surface, borderRadius: RADII.lg, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  assistantName: { color: COLORS.primary, fontFamily: FONTS.bodyBold, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  assistantText: { ...TYPE.body, color: COLORS.textSecondary },
  upsellBubble: { maxWidth: '80%', backgroundColor: COLORS.surfaceDark, borderRadius: RADII.lg, paddingHorizontal: 16, paddingVertical: 14 },
  inlineProButton: { alignSelf: 'flex-start', marginTop: 12, backgroundColor: COLORS.accent, borderRadius: RADII.sm, paddingHorizontal: 14, paddingVertical: 10 },
  inlineProText: { ...TYPE.meta, color: COLORS.surfaceDark, textTransform: 'uppercase' },
  inputWrap: { flexDirection: 'row', gap: 10, paddingTop: 8 },
  input: { flex: 1, backgroundColor: COLORS.surface, borderRadius: RADII.md, paddingHorizontal: 16, paddingVertical: 16, fontSize: 16, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border, fontFamily: FONTS.body },
  sendButton: { width: 54, borderRadius: RADII.md, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', ...SHADOW.card },
});
