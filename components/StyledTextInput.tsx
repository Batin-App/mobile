import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface StyledTextInput {
  label?: string;
  error?: string;
}

const StyledTextInput: React.FC<StyledTextInput & TextInputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label} {...props}>
          {label}
        </Text>
      )}
      <View>
        <TextInput style={[styles.textInput, style]} {...props} />
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
    paddingVertical: 4,
  },
  error: {
    color: 'red',
  },
});

export { StyledTextInput };
