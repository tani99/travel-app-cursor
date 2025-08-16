import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthErrorDisplay = ({ 
  error, 
  style,
  textStyle,
  containerStyle 
}) => {
  if (!error) {
    return null;
  }

  return (
    <View style={[styles.authErrorContainer, containerStyle, style]}>
      <Text style={[styles.authErrorText, textStyle]}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AuthErrorDisplay;
