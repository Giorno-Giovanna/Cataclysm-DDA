import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from '../services/storage';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ReviewPromptScreen } from '../screens/ReviewPromptScreen';
import { PaywallScreen } from '../screens/PaywallScreen';
import { MainTabs } from './MainTabs';
import { GardenDesignScreen } from '../screens/GardenDesignScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    storage.getBool(storage.keys.hasCompletedIntro).then((v) => {
      setCompleted(v);
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={completed ? 'MainTabs' : 'Splash'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ReviewPrompt" component={ReviewPromptScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="GardenDesign" component={GardenDesignScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
