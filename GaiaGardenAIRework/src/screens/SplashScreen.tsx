import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { storage } from '../services/storage';

export function SplashScreen({ navigation }: any) {
  const maskPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;

    const startDelay = setTimeout(() => {
      Animated.timing(maskPosition, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 300);

    const navTimeout = setTimeout(async () => {
      const hasCompletedIntro = await storage.getBool(storage.keys.hasCompletedIntro);
      if (!isMounted) {
        return;
      }
      navigation.replace(hasCompletedIntro ? 'MainTabs' : 'Onboarding');
    }, 1800);

    return () => {
      isMounted = false;
      clearTimeout(startDelay);
      clearTimeout(navTimeout);
    };
  }, [navigation, maskPosition]);

  const maskStyle = {
    transform: [
      {
        translateX: maskPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 360],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Garden Design</Text>
      <View style={styles.logoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Gaia:</Text>
          <Text style={styles.subtitle}>Garden Design AI</Text>
        </View>
        <Animated.View style={[styles.mask, maskStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kicker: {
    position: 'absolute',
    top: '34%',
    color: COLORS.primary,
    fontSize: 12,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  logoContainer: {
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: 28,
    paddingVertical: 18,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 46,
    color: COLORS.secondary,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 22,
    letterSpacing: 1.1,
    color: COLORS.primary,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
  },
});
