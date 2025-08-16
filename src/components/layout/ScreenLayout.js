import React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';

const ScreenLayout = ({ 
  children, 
  backgroundColor = colors.background.primary,
  paddingHorizontal = 24,
  scrollable = false,
  contentContainerStyle,
  style,
  ...props 
}) => {
  const containerStyle = [
    styles.container,
    { backgroundColor },
    style
  ];

  const contentStyle = [
    styles.content,
    { paddingHorizontal },
    contentContainerStyle
  ];

  if (scrollable) {
    return (
      <SafeAreaView style={containerStyle} {...props}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          nestedScrollEnabled={true}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle} {...props}>
      <View style={contentStyle}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default ScreenLayout;
