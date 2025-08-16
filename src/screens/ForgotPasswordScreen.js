import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../components/layout/ScreenLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { resetPassword } from '../services/auth';
import { getUserFriendlyError } from '../utils/errorMessages';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(''); // 'success', 'error', ''

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (errorCode) => {
    return getUserFriendlyError(errorCode, 'password-reset');
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setStatus('');
    setErrors({});

    try {
      console.log('Attempting to reset password for:', email);
      console.log('Firebase config check:', {
        authDomain: 'travel-planner-codex.firebaseapp.com',
        projectId: 'travel-planner-codex'
      });
      
      const result = await resetPassword(email);
      
      if (result.success) {
        setStatus('success');
        console.log('Password reset email sent successfully');
        Alert.alert(
          'Reset Link Sent! 📧',
          'We\'ve sent a password reset link to your email. Please check your inbox (and spam folder) for instructions.',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.navigate('Login') 
            }
          ]
        );
      } else {
        setStatus('error');
        const errorMessage = result.error?.message || getErrorMessage(result.error?.code || result.error);
        console.error('Password reset failed:', result.error);
        Alert.alert('Reset Failed', errorMessage);
      }
    } catch (error) {
      setStatus('error');
      console.error('Unexpected error during password reset:', error);
      Alert.alert('Error', getUserFriendlyError(error, 'password-reset'));
    } finally {
      setLoading(false);
    }
  };

  const clearStatus = () => {
    setStatus('');
    setErrors({});
  };

  return (
    <ScreenLayout>
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
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive reset link
        </Text>
      </View>

      {/* Status Messages */}
      {status === 'success' && (
        <View style={[styles.statusContainer, styles.successContainer]}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={styles.successText}>
            Reset link sent! Check your email.
          </Text>
        </View>
      )}

      {status === 'error' && (
        <View style={[styles.statusContainer, styles.errorContainer]}>
          <Ionicons name="alert-circle" size={20} color="#DC2626" />
          <Text style={styles.errorText}>
            Failed to send reset link. Please try again.
          </Text>
        </View>
      )}

      {/* Form */}
      <View style={styles.formContainer}>
        <CustomInput
          label="Email Address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            clearStatus();
          }}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          editable={!loading}
        />

        <CustomButton
          title={loading ? "Sending..." : "Send Reset Link"}
          onPress={handleResetPassword}
          loading={loading}
          style={styles.resetButton}
          disabled={loading}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2563EB" />
            <Text style={styles.loadingText}>
              Sending reset link to your email...
            </Text>
          </View>
        )}
      </View>

      {/* Help Text */}
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>
          💡 Don't see the email? Check your spam folder or try again.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Remember password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 40,
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
    lineHeight: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  successContainer: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
  },
  successText: {
    color: '#059669',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
  },
  resetButton: {
    marginTop: 24,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  loadingText: {
    color: '#64748B',
    fontSize: 14,
    marginLeft: 8,
  },
  helpContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  helpText: {
    color: '#475569',
    fontSize: 14,
    textAlign: 'center',
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

export default ForgotPasswordScreen;
