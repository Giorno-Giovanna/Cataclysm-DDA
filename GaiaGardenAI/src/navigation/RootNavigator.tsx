import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { OnboardingRecreateScreen } from '../screens/OnboardingRecreateScreen';
import { OnboardingDesignEditScreen } from '../screens/OnboardingDesignEditScreen';
import { ReviewPromptScreen } from '../screens/ReviewPromptScreen';
import { PaywallScreen } from '../screens/PaywallScreen';
import { OneTimeOfferScreen } from '../screens/OneTimeOfferScreen';
import { MainTabs } from './MainTabs';
import { GardenDesignScreen } from '../screens/GardenDesignScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="OnboardingRecreate" component={OnboardingRecreateScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="OnboardingDesignEdit" component={OnboardingDesignEditScreen} />
      <Stack.Screen name="ReviewPrompt" component={ReviewPromptScreen} />
      <Stack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="OneTimeOffer"
        component={OneTimeOfferScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="GardenDesign" component={GardenDesignScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
