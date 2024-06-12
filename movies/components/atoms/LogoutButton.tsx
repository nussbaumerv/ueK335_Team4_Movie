import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const LogoutButton = ({ onPress, iconName }) => {
    const theme = useTheme();

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#4A4458' }]} onPress={onPress}>
            <IconButton
                icon={iconName}
                iconColor={'white'}
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

export default LogoutButton;
