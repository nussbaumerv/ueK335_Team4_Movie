import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const AddButton = ({ onPress, iconName }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        button: {
            width: 40,
            height: 40,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.onPrimary
        },
    });

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={onPress}>
            <IconButton
                icon={iconName}
                iconColor={theme.colors.onPrimary}
                size={24}
            />
        </TouchableOpacity>
    );
};



export default AddButton;
