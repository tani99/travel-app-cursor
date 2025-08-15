import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GmailButton = ({ onPress, loading = false, disabled = false, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#1E293B" size="small" />
      ) : (
        <View style={styles.content}>
          <Ionicons name="mail" size={20} color="#EA4335" style={styles.icon} />
          <Text style={styles.text}>Continue with Gmail</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
});

export default GmailButton;
