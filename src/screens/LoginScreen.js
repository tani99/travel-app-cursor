import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ScreenLayout from '../components/layout/ScreenLayout';
import ScreenHeader from '../components/layout/ScreenHeader';
import ScreenFooter from '../components/layout/ScreenFooter';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GmailButton from '../components/GmailButton';
import { loginWithEmail, loginWithGmail } from '../services/auth';
import { getUserFriendlyError } from '../utils/errorMessages';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [gmailLoading, setGmailLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setAuthError(''); // Clear any previous errors
    
    try {
      console.log('Attempting to login with:', { email, password: '***' });
      const result = await loginWithEmail(email, password);
      console.log('Login result:', result);
      
      if (result.success) {
        // Navigation will be handled by AuthContext
        console.log('Login successful - user should be redirected to Home');
      } else {
        // Use the user-friendly error message from the service
        setAuthError(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(getUserFriendlyError(error, 'login'));
    } finally {
      setLoading(false);
    }
  };

  const handleGmailLogin = async () => {
    setGmailLoading(true);
    try {
      console.log('Attempting Gmail login...');
      const result = await loginWithGmail();
      console.log('Gmail login result:', result);
      
      if (result.success) {
        console.log('Gmail login successful');
      } else {
        Alert.alert('Gmail Login Failed', result.error || 'Gmail login is not available at this time.');
      }
    } catch (error) {
      console.error('Gmail login error:', error);
      Alert.alert('Error', getUserFriendlyError(error, 'gmail'));
    } finally {
      setGmailLoading(false);
    }
  };

  return (
    <ScreenLayout>
      {/* Header */}
      <ScreenHeader navigation={navigation} />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      {/* Gmail Button */}
      <GmailButton
        onPress={handleGmailLogin}
        loading={gmailLoading}
        style={styles.gmailButton}
      />

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Email/Password Form */}
      <View style={styles.formContainer}>
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
          placeholder="Enter your password"
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {authError ? (
          <View style={styles.authErrorContainer}>
            <Text style={styles.authErrorText}>{authError}</Text>
          </View>
        ) : null}

        <CustomButton
          title="Sign In"
          onPress={handleEmailLogin}
          loading={loading}
          style={styles.signInButton}
        />
      </View>

      {/* Footer */}
      <ScreenFooter
        text="Don't have an account?"
        linkText="Create Account"
        onLinkPress={() => navigation.navigate('Register')}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
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

});

export default LoginScreen;
