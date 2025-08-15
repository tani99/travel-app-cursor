import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GmailButton from '../components/GmailButton';
import { registerWithEmail, loginWithGmail } from '../services/auth';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [gmailLoading, setGmailLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setAuthError(''); // Clear any previous errors
    
    try {
      console.log('Attempting to register with:', { email, password: '***' });
      const result = await registerWithEmail(email, password);
      console.log('Registration result:', result);
      
      if (result.success) {
        Alert.alert(
          'Success! 🎉', 
          'Account created successfully! You can now sign in with your email and password.', 
          [
            { 
              text: 'Sign In Now', 
              onPress: () => navigation.navigate('Login') 
            }
          ]
        );
      } else {
        // Handle specific Firebase auth errors with user-friendly messages
        let errorMessage = result.error || 'Unknown error occurred';
        
        if (result.error.includes('auth/email-already-in-use')) {
          errorMessage = 'This email is already registered. Please try signing in instead, or use a different email address.';
        } else if (result.error.includes('auth/weak-password')) {
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
        } else if (result.error.includes('auth/invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (result.error.includes('auth/operation-not-allowed')) {
          errorMessage = 'Email/password authentication is not enabled. Please contact support.';
        } else if (result.error.includes('auth/user-disabled')) {
          errorMessage = 'This account has been disabled. Please contact support.';
        } else if (result.error.includes('auth/too-many-requests')) {
          errorMessage = 'Too many failed attempts. Please try again later.';
        }
        
        setAuthError(errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError('An unexpected error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGmailRegister = async () => {
    setGmailLoading(true);
    try {
      console.log('Attempting Gmail registration...');
      const result = await loginWithGmail();
      console.log('Gmail registration result:', result);
      
      if (result.success) {
        console.log('Gmail registration successful');
      } else {
        Alert.alert('Gmail Registration Failed', result.error || 'Gmail registration is not available at this time.');
      }
    } catch (error) {
      console.error('Gmail registration error:', error);
      Alert.alert('Error', 'An unexpected error occurred during Gmail registration: ' + error.message);
    } finally {
      setGmailLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join WelcomeApp today</Text>
          </View>

                  {/* Gmail Button */}
        <GmailButton
          onPress={handleGmailRegister}
          loading={gmailLoading}
          style={styles.gmailButton}
        />

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <CustomInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              autoCapitalize="words"
              error={errors.fullName}
            />

            <CustomInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <CustomInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
              error={errors.password}
            />

            <CustomInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
              error={errors.confirmPassword}
            />

                      {authError ? (
            <View style={styles.authErrorContainer}>
              <Text style={styles.authErrorText}>{authError}</Text>
            </View>
          ) : null}

          <CustomButton
            title="Create Account"
            onPress={handleEmailRegister}
            loading={loading}
            style={styles.createAccountButton}
          />
          </View>

                  {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  gmailButton: {
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#64748B',
  },
  formContainer: {
    marginBottom: 20,
  },
  createAccountButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  authErrorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  authErrorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#64748B',
  },
  footerLink: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default RegisterScreen;
