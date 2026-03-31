import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { sendChatMessage } from '../services/api';

export function ChatScreen({ navigation }: any) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I’m Gardener. You can ask me anything about gardens, plants, watering, care, and landscaping.' }]);
  const send = async () => {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input } as any];
    setMessages(next);
    setInput('');
    const reply = await sendChatMessage(next);
    setMessages((m) => [...m, reply as any]);
  };
  return <View style={{ flex: 1, padding: 16, gap: 8, backgroundColor: '#f7f7f3' }}><Text onPress={() => navigation.goBack()}>✕ Close</Text><Text style={{ fontSize: 24, fontWeight: '700' }}>Gardener</Text><FlatList data={messages} keyExtractor={(_,i)=>String(i)} renderItem={({item}) => <View style={{ alignSelf: item.role==='user'?'flex-end':'flex-start', backgroundColor: item.role==='user'?'#cde3c9':'#fff', borderRadius: 12, padding: 10, marginVertical: 4, maxWidth: '85%' }}><Text>{item.content}</Text></View>} /><TextInput placeholder='Ask anything...' value={input} onChangeText={setInput} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }} /><PrimaryButton title='Send' onPress={send} /></View>;
}
