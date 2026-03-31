import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const steps = ['Analyzing your space', 'Selecting plants', 'Designing layout', 'Adding final touches'];
export function LoadingSteps() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx((i) => (i + 1) % steps.length), 500); return () => clearInterval(t); }, []);
  return <View>{steps.map((s, i) => <Text key={s} style={{ opacity: i <= idx ? 1 : 0.35, marginVertical: 3 }}>{s}</Text>)}</View>;
}
