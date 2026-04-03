import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { COLORS, RADII } from '../constants/theme';

const Tab = createBottomTabNavigator();

export function MainTabs({ navigation, route }: any) {
  useEffect(() => {
    if (!route?.params?.showOfferAfterPaywall) {
      return;
    }
    const timer = setTimeout(() => navigation.navigate('OneTimeOffer'), 260);
    return () => clearTimeout(timer);
  }, [navigation, route?.params?.showOfferAfterPaywall]);

  return (
    <Tab.Navigator
      screenOptions={({ route: tabRoute }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 12,
          height: 76,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopWidth: 0,
          borderRadius: RADII.lg,
          backgroundColor: 'rgba(255,255,255,0.84)',
          shadowColor: '#0D140F',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          letterSpacing: 0.5,
        },
        tabBarItemStyle: {
          borderRadius: RADII.md,
          marginHorizontal: 4,
          marginVertical: 4,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={(tabRoute.name === 'Home' ? 'home-variant' : tabRoute.name === 'Explore' ? 'compass-outline' : 'bookmark-clock-outline') as any}
            color={color}
            size={size + 2}
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
