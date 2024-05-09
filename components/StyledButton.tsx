import { Button, ButtonProps, View } from 'react-native';

interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
}

const StyledButton: React.FC<StyledButtonProps & ButtonProps> = ({
  variant = 'primary',
  ...props
}) => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        borderRadius: 100,
        overflow: 'hidden',
        // flex: 1,
      }}
    >
      <Button
        color={
          variant === 'danger'
            ? '#FFC700'
            : variant === 'secondary'
            ? '#8F8F8F'
            : '#FFC700'
        }
        {...props}
      />
    </View>
  );
};

export { StyledButton };
