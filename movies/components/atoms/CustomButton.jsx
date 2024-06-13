import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const CustomButton = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <IconButton
        icon={iconName}
        iconColor="white"
        size={24}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#393540',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
