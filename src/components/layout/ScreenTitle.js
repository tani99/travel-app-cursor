import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScreenTitle = ({ 
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
  containerStyle,
  ...props 
}) => {
  return (
    <View style={[styles.container, containerStyle]} {...props}>
      {title && (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ScreenTitle;
