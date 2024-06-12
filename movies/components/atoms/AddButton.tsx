import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const AddButton = ({ onPress, iconName }) => {
    const theme = useTheme();

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={onPress}>
            <IconButton
                icon={iconName}
                iconColor={'white'} // Set the color to white
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddButton;
