import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenLayout from '../components/layout/ScreenLayout';
import ScreenTitle from '../components/layout/ScreenTitle';
import CustomButton from '../components/CustomButton';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ScreenLayout contentContainerStyle={styles.content}>
      {/* Logo/Icon Placeholder */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>WA</Text>
        </View>
      </View>

      {/* Welcome Text */}
      <ScreenTitle 
        title="Welcome to"
        subtitle="Your personal space for everything"
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        containerStyle={styles.textContainer}
      />
      <Text style={styles.appName}>WelcomeApp</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
          style={styles.primaryButton}
        />
        
        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>Already have an account?</Text>
        </View>
        
        <CustomButton
          title="Sign In"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
          style={styles.secondaryButton}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    marginBottom: 8,
  },
  secondaryButton: {
    marginTop: 8,
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerText: {
    fontSize: 16,
    color: '#64748B',
  },
});

export default WelcomeScreen;
