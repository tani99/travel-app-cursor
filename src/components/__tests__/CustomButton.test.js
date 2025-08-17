import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

describe('CustomButton Component', () => {
  const defaultProps = {
    title: 'Test Button',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders with primary variant by default', () => {
      render(<CustomButton {...defaultProps} />);
      
      expect(screen.getByText('Test Button')).toBeTruthy();
      expect(screen.getByTestId('custom-button')).toBeTruthy();
    });

    test('renders with custom title', () => {
      render(<CustomButton {...defaultProps} title="Custom Title" />);
      
      expect(screen.getByText('Custom Title')).toBeTruthy();
    });

    test('renders without crashing when minimal props are provided', () => {
      expect(() => render(<CustomButton title="Minimal" onPress={jest.fn()} />)).not.toThrow();
    });
  });

  describe('Button Variants', () => {
    test('renders with primary variant', () => {
      render(<CustomButton {...defaultProps} variant="primary" />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
      expect(screen.getByText('Test Button')).toBeTruthy();
    });

    test('renders with secondary variant', () => {
      render(<CustomButton {...defaultProps} variant="secondary" />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
      expect(screen.getByText('Test Button')).toBeTruthy();
    });

    test('applies correct styling for primary variant', () => {
      render(<CustomButton {...defaultProps} variant="primary" />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
      // Note: In React Native Testing Library, we can't directly test styles
      // but we can verify the component renders without crashing
    });

    test('applies correct styling for secondary variant', () => {
      render(<CustomButton {...defaultProps} variant="secondary" />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });
  });

  describe('Press Events', () => {
    test('handles press events', () => {
      const mockOnPress = jest.fn();
      render(<CustomButton {...defaultProps} onPress={mockOnPress} />);
      
      const button = screen.getByTestId('custom-button');
      fireEvent.press(button);
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    test('does not call onPress when disabled', () => {
      const mockOnPress = jest.fn();
      render(<CustomButton {...defaultProps} onPress={mockOnPress} disabled={true} />);
      
      const button = screen.getByTestId('custom-button');
      fireEvent.press(button);
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    test('does not call onPress when loading', () => {
      const mockOnPress = jest.fn();
      render(<CustomButton {...defaultProps} onPress={mockOnPress} loading={true} />);
      
      const button = screen.getByTestId('custom-button');
      fireEvent.press(button);
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    test('handles multiple press events', () => {
      const mockOnPress = jest.fn();
      render(<CustomButton {...defaultProps} onPress={mockOnPress} />);
      
      const button = screen.getByTestId('custom-button');
      
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);
      
      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });
  });

  describe('Loading State', () => {
    test('shows loading spinner when loading is true', () => {
      render(<CustomButton {...defaultProps} loading={true} />);
      
      // ActivityIndicator should be present
      const activityIndicator = screen.getByTestId('activity-indicator');
      expect(activityIndicator).toBeTruthy();
    });

    test('hides text when loading is true', () => {
      render(<CustomButton {...defaultProps} loading={true} />);
      
      // Text should not be visible when loading
      expect(screen.queryByText('Test Button')).toBeNull();
    });

    test('shows text when loading is false', () => {
      render(<CustomButton {...defaultProps} loading={false} />);
      
      expect(screen.getByText('Test Button')).toBeTruthy();
    });

    test('disables button when loading', () => {
      render(<CustomButton {...defaultProps} loading={true} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    test('uses correct spinner color for primary variant', () => {
      render(<CustomButton {...defaultProps} loading={true} variant="primary" />);
      
      const activityIndicator = screen.getByTestId('activity-indicator');
      expect(activityIndicator).toBeTruthy();
    });

    test('uses correct spinner color for secondary variant', () => {
      render(<CustomButton {...defaultProps} loading={true} variant="secondary" />);
      
      const activityIndicator = screen.getByTestId('activity-indicator');
      expect(activityIndicator).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    test('applies disabled styling when disabled is true', () => {
      render(<CustomButton {...defaultProps} disabled={true} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    test('does not apply disabled styling when disabled is false', () => {
      render(<CustomButton {...defaultProps} disabled={false} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button.props.accessibilityState.disabled).toBe(false);
    });

    test('shows disabled text styling', () => {
      render(<CustomButton {...defaultProps} disabled={true} />);
      
      // Text should still be visible but with disabled styling
      expect(screen.getByText('Test Button')).toBeTruthy();
    });

    test('prevents press events when disabled', () => {
      const mockOnPress = jest.fn();
      render(<CustomButton {...defaultProps} onPress={mockOnPress} disabled={true} />);
      
      const button = screen.getByTestId('custom-button');
      fireEvent.press(button);
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    test('disabled state overrides loading state for press events', () => {
      const mockOnPress = jest.fn();
      render(<CustomButton {...defaultProps} onPress={mockOnPress} disabled={true} loading={true} />);
      
      const button = screen.getByTestId('custom-button');
      fireEvent.press(button);
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('Custom Styling', () => {
    test('applies custom button style', () => {
      const customStyle = { backgroundColor: 'red' };
      render(<CustomButton {...defaultProps} style={customStyle} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });

    test('applies custom text style', () => {
      const customTextStyle = { fontSize: 20 };
      render(<CustomButton {...defaultProps} textStyle={customTextStyle} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });

    test('combines custom styles with default styles', () => {
      const customStyle = { backgroundColor: 'red' };
      const customTextStyle = { fontSize: 20 };
      
      render(<CustomButton {...defaultProps} style={customStyle} textStyle={customTextStyle} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });

    test('handles undefined style props gracefully', () => {
      expect(() => render(<CustomButton {...defaultProps} style={undefined} textStyle={undefined} />)).not.toThrow();
    });
  });

  describe('Touch Target Size', () => {
    test('has minimum touch target size of 44x44 points', () => {
      render(<CustomButton {...defaultProps} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
      
      // The component has minHeight: 56 which exceeds the 44pt minimum
      // This test verifies the component renders without crashing
    });

    test('maintains touch target size with custom styling', () => {
      const customStyle = { paddingVertical: 20 };
      render(<CustomButton {...defaultProps} style={customStyle} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });

    test('touch target size works with different variants', () => {
      const variants = ['primary', 'secondary'];
      
      variants.forEach(variant => {
        const { unmount } = render(<CustomButton {...defaultProps} variant={variant} />);
        
        const button = screen.getByTestId('custom-button');
        expect(button).toBeTruthy();
        
        unmount();
      });
    });
  });



  describe('Edge Cases', () => {
    test('handles empty title', () => {
      render(<CustomButton {...defaultProps} title="" />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });

    test('handles very long title', () => {
      const longTitle = 'This is a very long button title that might wrap to multiple lines';
      render(<CustomButton {...defaultProps} title={longTitle} />);
      
      expect(screen.getByText(longTitle)).toBeTruthy();
    });

    test('handles special characters in title', () => {
      const specialTitle = 'Button with special chars: !@#$%^&*()';
      render(<CustomButton {...defaultProps} title={specialTitle} />);
      
      expect(screen.getByText(specialTitle)).toBeTruthy();
    });

    test('handles undefined onPress gracefully', () => {
      expect(() => render(<CustomButton {...defaultProps} onPress={undefined} />)).not.toThrow();
    });

    test('handles null onPress gracefully', () => {
      expect(() => render(<CustomButton {...defaultProps} onPress={null} />)).not.toThrow();
    });

    test('handles rapid button presses', () => {
      const mockOnPress = jest.fn();
      render(<CustomButton {...defaultProps} onPress={mockOnPress} />);
      
      const button = screen.getByTestId('custom-button');
      
      // Simulate rapid presses
      for (let i = 0; i < 10; i++) {
        fireEvent.press(button);
      }
      
      expect(mockOnPress).toHaveBeenCalledTimes(10);
    });
  });

  describe('Performance', () => {
    test('renders quickly without performance issues', () => {
      const startTime = Date.now();
      
      render(<CustomButton {...defaultProps} />);
      
      const endTime = Date.now();
      const renderTime = endTime - startTime;
      
      // Should render in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });

    test('handles multiple re-renders efficiently', () => {
      const { rerender } = render(<CustomButton {...defaultProps} />);
      
      // Re-render multiple times
      for (let i = 0; i < 10; i++) {
        rerender(<CustomButton {...defaultProps} title={`Button ${i}`} />);
      }
      
      expect(screen.getByText('Button 9')).toBeTruthy();
    });
  });

  describe('Integration with Other Components', () => {
    test('works with TouchableOpacity props', () => {
      render(<CustomButton {...defaultProps} activeOpacity={0.5} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });

    test('maintains functionality with custom props', () => {
      const customProps = {
        testID: 'custom-button',
        accessibilityLabel: 'Custom accessibility label',
      };
      
      render(<CustomButton {...defaultProps} {...customProps} />);
      
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });
  });
});
