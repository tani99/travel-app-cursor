import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatusMessage = ({ 
  type, // 'success' or 'error'
  message,
  style,
  textStyle,
  containerStyle 
}) => {
  if (!type || !message) {
    return null;
  }

  const isSuccess = type === 'success';
  const iconName = isSuccess ? 'checkmark-circle' : 'alert-circle';
  const iconColor = isSuccess ? '#059669' : '#DC2626';

  return (
    <View style={[
      styles.statusContainer, 
      isSuccess ? styles.successContainer : styles.errorContainer,
      containerStyle,
      style
    ]}>
      <Ionicons name={iconName} size={20} color={iconColor} />
      <Text style={[
        styles.statusText,
        isSuccess ? styles.successText : styles.errorText,
        textStyle
      ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  statusText: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  successText: {
    color: '#059669',
  },
  errorText: {
    color: '#DC2626',
  },
});

export default StatusMessage;
