import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { resetPassword } from '../services/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await resetPassword(email);
      if (result.success) {
        Alert.alert(
          'Reset Link Sent',
          'Check your email for password reset instructions.',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.navigate('Login') 
            }
          ]
        );
      } else {
        Alert.alert('Reset Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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

        {/* Form */}
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

          <CustomButton
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={loading}
            style={styles.resetButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Remember password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Back to Sign In</Text>
          </TouchableOpacity>
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
  formContainer: {
    flex: 1,
  },
  resetButton: {
    marginTop: 24,
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
