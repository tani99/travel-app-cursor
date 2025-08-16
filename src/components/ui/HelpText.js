import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpText = ({ 
  text, 
  icon = '💡', 
  style, 
  textStyle,
  containerStyle 
}) => {
  if (!text) return null;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>
        {icon} {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  text: {
    color: '#475569',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HelpText;
