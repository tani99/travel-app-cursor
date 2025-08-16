import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingIndicator = ({ 
  message = 'Loading...', 
  size = 'small', 
  color = '#2563EB',
  containerStyle,
  textStyle,
  showBackground = true 
}) => {
  return (
    <View style={[
      styles.container,
      showBackground && styles.withBackground,
      containerStyle
    ]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={[styles.text, textStyle]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  withBackground: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginTop: 16,
  },
  text: {
    color: '#64748B',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default LoadingIndicator;
