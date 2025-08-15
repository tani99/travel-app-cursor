import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Icon Placeholder */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>WA</Text>
          </View>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.appName}>WelcomeApp</Text>
          <Text style={styles.subtitle}>
            Your personal space for everything
          </Text>
        </View>

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
  title: {
    fontSize: 24,
    color: '#64748B',
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 26,
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
