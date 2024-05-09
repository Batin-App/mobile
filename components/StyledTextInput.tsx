import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isReadOnly?: boolean;
}

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  label,
  error,
  style,
  isReadOnly = false,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      <View>
        <TextInput
          style={[styles.textInput, style, isReadOnly && styles.readOnlyInput]}
          editable={!isReadOnly}
          {...props}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    gap: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  textInput: {
    borderColor: '#00000050',
    borderWidth: 2,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  readOnlyInput: {
    backgroundColor: '#E8E8E8',
  },
  error: {
    color: 'red',
  },
});

export { StyledTextInput };
