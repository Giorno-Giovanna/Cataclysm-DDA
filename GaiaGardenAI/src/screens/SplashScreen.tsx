import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';

export function SplashScreen({ navigation }: any) {
  const maskPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the reveal animation after a short delay
    const startDelay = setTimeout(() => {
      Animated.timing(maskPosition, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 300);

    // Navigate after animation completes
    const navTimeout = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1800);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(navTimeout);
    };
  }, [navigation, maskPosition]);

  // The white mask that slides right to reveal the text
  const maskStyle = {
    transform: [{
      translateX: maskPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 350],
      }),
    }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* The text that gets revealed */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Gaia:</Text>
          <Text style={styles.subtitle}>Garden Design AI</Text>
        </View>

        {/* White mask that slides right to reveal text */}
        <Animated.View style={[styles.mask, maskStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#2E7D32',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4CAF50',
    marginTop: 4,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
});
