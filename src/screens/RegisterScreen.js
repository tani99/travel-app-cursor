import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../components/layout/ScreenLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GmailButton from '../components/GmailButton';
import { registerWithEmail, loginWithGmail } from '../services/auth';
import { getUserFriendlyError } from '../utils/errorMessages';

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
      newErrors.fullName = 'Please enter your full name';
    }
    
    if (!email) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Please create a password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Please try again';
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
        // Use the user-friendly error message from the service
        setAuthError(result.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError(getUserFriendlyError(error, 'registration'));
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
      Alert.alert('Error', getUserFriendlyError(error, 'gmail'));
    } finally {
      setGmailLoading(false);
    }
  };

  return (
    <ScreenLayout scrollable contentContainerStyle={styles.scrollContent}>
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
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
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
