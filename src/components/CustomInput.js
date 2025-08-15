import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = [
    styles.input,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    style
  ];

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#64748B"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#64748B"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1E293B',
    minHeight: 56,
  },
  inputFocused: {
    borderColor: '#2563EB',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CustomInput;
