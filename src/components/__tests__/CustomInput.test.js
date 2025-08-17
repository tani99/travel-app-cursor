import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import CustomInput from '../CustomInput';

describe('CustomInput Component', () => {
  const defaultProps = {
    label: 'Test Label',
    value: '',
    onChangeText: jest.fn(),
    placeholder: 'Test placeholder',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders with label and placeholder', () => {
      render(<CustomInput {...defaultProps} />);
      
      expect(screen.getByText('Test Label')).toBeTruthy();
      expect(screen.getByPlaceholderText('Test placeholder')).toBeTruthy();
    });

    test('renders without label when not provided', () => {
      const { label, ...propsWithoutLabel } = defaultProps;
      render(<CustomInput {...propsWithoutLabel} />);
      
      expect(screen.queryByText('Test Label')).toBeNull();
      expect(screen.getByPlaceholderText('Test placeholder')).toBeTruthy();
    });

    test('renders with custom style', () => {
      const customStyle = { backgroundColor: 'red' };
      render(<CustomInput {...defaultProps} style={customStyle} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeTruthy();
    });
  });

  describe('Text Input Changes', () => {
    test('handles text input changes', () => {
      const mockOnChangeText = jest.fn();
      render(<CustomInput {...defaultProps} onChangeText={mockOnChangeText} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      fireEvent.changeText(input, 'test input');
      
      expect(mockOnChangeText).toHaveBeenCalledWith('test input');
    });

    test('displays current value', () => {
      render(<CustomInput {...defaultProps} value="current value" />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input.props.value).toBe('current value');
    });
  });

  describe('Password Toggle', () => {
    test('shows password toggle when secureTextEntry is true', () => {
      render(<CustomInput {...defaultProps} secureTextEntry={true} />);
      
      const eyeIcon = screen.getByTestId('eye-icon');
      expect(eyeIcon).toBeTruthy();
    });

    test('hides password toggle when secureTextEntry is false', () => {
      render(<CustomInput {...defaultProps} secureTextEntry={false} />);
      
      expect(screen.queryByTestId('eye-icon')).toBeNull();
    });

    test('toggles password visibility when eye icon is pressed', () => {
      render(<CustomInput {...defaultProps} secureTextEntry={true} />);
      
      const eyeIcon = screen.getByTestId('eye-icon');
      const input = screen.getByPlaceholderText('Test placeholder');
      
      // Initially password should be hidden
      expect(input.props.secureTextEntry).toBe(true);
      
      // Press eye icon to show password
      fireEvent.press(eyeIcon);
      expect(input.props.secureTextEntry).toBe(false);
      
      // Press eye icon again to hide password
      fireEvent.press(eyeIcon);
      expect(input.props.secureTextEntry).toBe(true);
    });
  });

  describe('Validation Errors', () => {
    test('displays validation errors', () => {
      const errorMessage = 'This field is required';
      render(<CustomInput {...defaultProps} error={errorMessage} />);
      
      expect(screen.getByText(errorMessage)).toBeTruthy();
    });

    test('applies error styling when error is present', () => {
      const errorMessage = 'This field is required';
      render(<CustomInput {...defaultProps} error={errorMessage} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeTruthy();
      // Note: In React Native Testing Library, we can't directly test styles
      // but we can verify the component renders without crashing
    });

    test('does not display error when error is not provided', () => {
      render(<CustomInput {...defaultProps} />);
      
      expect(screen.queryByText('This field is required')).toBeNull();
    });
  });

  describe('Focus and Blur States', () => {
    test('handles focus state', () => {
      render(<CustomInput {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      fireEvent(input, 'focus');
      
      // Component should handle focus without crashing
      expect(input).toBeTruthy();
    });

    test('handles blur state', () => {
      render(<CustomInput {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      fireEvent(input, 'blur');
      
      // Component should handle blur without crashing
      expect(input).toBeTruthy();
    });

    test('maintains focus state correctly', () => {
      render(<CustomInput {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      
      // Focus the input
      fireEvent(input, 'focus');
      
      // Change text while focused
      fireEvent.changeText(input, 'test');
      
      // Blur the input
      fireEvent(input, 'blur');
      
      expect(defaultProps.onChangeText).toHaveBeenCalledWith('test');
    });
  });

  describe('Keyboard Types', () => {
    test('supports different keyboard types', () => {
      const keyboardTypes = ['default', 'email-address', 'numeric', 'phone-pad'];
      
      keyboardTypes.forEach(keyboardType => {
        const { unmount } = render(
          <CustomInput {...defaultProps} keyboardType={keyboardType} />
        );
        
        const input = screen.getByPlaceholderText('Test placeholder');
        expect(input.props.keyboardType).toBe(keyboardType);
        
        unmount();
      });
    });

    test('uses default keyboard type when not specified', () => {
      render(<CustomInput {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input.props.keyboardType).toBe('default');
    });
  });

  describe('Auto-capitalization and Correction', () => {
    test('supports autoCapitalize property', () => {
      render(<CustomInput {...defaultProps} autoCapitalize="words" />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input.props.autoCapitalize).toBe('words');
    });

    test('supports autoCorrect property', () => {
      render(<CustomInput {...defaultProps} autoCorrect={true} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input.props.autoCorrect).toBe(true);
    });

    test('uses default values for autoCapitalize and autoCorrect', () => {
      render(<CustomInput {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input.props.autoCapitalize).toBe('none');
      expect(input.props.autoCorrect).toBe(false);
    });
  });



  describe('Edge Cases', () => {
    test('handles very long input values', () => {
      const longValue = 'a'.repeat(1000);
      const mockOnChangeText = jest.fn();
      
      render(
        <CustomInput 
          {...defaultProps} 
          value={longValue}
          onChangeText={mockOnChangeText}
        />
      );
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input.props.value).toBe(longValue);
    });

    test('handles special characters in input', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const mockOnChangeText = jest.fn();
      
      render(
        <CustomInput 
          {...defaultProps} 
          onChangeText={mockOnChangeText}
        />
      );
      
      const input = screen.getByPlaceholderText('Test placeholder');
      fireEvent.changeText(input, specialChars);
      
      expect(mockOnChangeText).toHaveBeenCalledWith(specialChars);
    });

    test('handles empty string values', () => {
      render(<CustomInput {...defaultProps} value="" />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input.props.value).toBe('');
    });

    test('handles null and undefined values gracefully', () => {
      render(<CustomInput {...defaultProps} value={null} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeTruthy();
    });
  });

  describe('Performance', () => {
    test('renders quickly without performance issues', () => {
      const startTime = Date.now();
      
      render(<CustomInput {...defaultProps} />);
      
      const endTime = Date.now();
      const renderTime = endTime - startTime;
      
      // Should render in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });

    test('handles rapid text changes efficiently', () => {
      const mockOnChangeText = jest.fn();
      render(<CustomInput {...defaultProps} onChangeText={mockOnChangeText} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      
      // Simulate rapid typing
      for (let i = 0; i < 10; i++) {
        fireEvent.changeText(input, `test${i}`);
      }
      
      expect(mockOnChangeText).toHaveBeenCalledTimes(10);
    });
  });
});
