import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

export function MainTabs({ navigation, route }: any) {
  useEffect(() => {
    if (!route?.params?.showOfferAfterPaywall) {
      return;
    }

    const timer = setTimeout(() => {
      navigation.navigate('OneTimeOffer');
    }, 260);

    return () => clearTimeout(timer);
  }, [navigation, route?.params?.showOfferAfterPaywall]);

  return (
    <Tab.Navigator
      screenOptions={({ route: tabRoute }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: { borderTopWidth: 0, height: 66, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={(tabRoute.name === 'Home' ? 'home' : tabRoute.name === 'Explore' ? 'compass' : 'time') as any}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
