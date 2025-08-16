import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ScreenFooter = ({ 
  text, 
  linkText, 
  onLinkPress, 
  style,
  textStyle,
  linkStyle 
}) => {
  return (
    <View style={[styles.footer, style]}>
      <Text style={[styles.footerText, textStyle]}>{text} </Text>
      <TouchableOpacity onPress={onLinkPress}>
        <Text style={[styles.footerLink, linkStyle]}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ScreenFooter;
