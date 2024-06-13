import { Alert, StyleSheet, Text, View } from 'react-native';
import { useEffect } from "react";
import { Button, useTheme } from 'react-native-paper';
import { LoginAPIRequest } from '../../service/Auth';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * LogoutPage component handles user logout functionality.
 * It logs the user out on component mount and provides an option to log in again.
 */
function LogoutPage() {
  const navigation = useNavigation();
  const theme = useTheme();

  /**
   * Function to log out the user.
   * Shows an alert on error during logout.
   */
  const logoutUser = async () => {
    try {
      await LoginAPIRequest().logout();
    } catch (error: any) {
      Alert.alert("Can't log you out", "Try restarting the app.");
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 40,
      fontFamily: 'Roboto',
      margin: 10,
      textAlign: 'center',
      color: 'white',
    },
    subTitle: {
      fontSize: 18,
      fontFamily: 'Roboto',
      marginBottom: 20,
      textAlign: 'center',
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
        <Text style={styles.title}>See you soon!</Text>
        <Text style={styles.subTitle}>You've been successfully logged out.</Text>
        <Button onPress={() => navigation.navigate('Login')} mode="contained">
          Login Again
        </Button>
    </View>
  );
}

export default LogoutPage;
