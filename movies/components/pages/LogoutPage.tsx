import { Alert, StyleSheet, Text, View } from 'react-native';
import { useEffect} from "react";
import { Button } from 'react-native-paper';
import { LoginAPIRequest } from '../../service/Auth';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


function LogoutPage() {
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
        <Text style={styles.title}>See you soon!</Text>
        <Text style={styles.subTitle}>You've been successfully logged out.</Text>
        <Button onPress={() => navigation.navigate('LoginForm')} mode="contained">
          Login Again
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Roboto',
    margin: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LogoutPage;
