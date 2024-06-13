import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { Text, TextInput, IconButton, useTheme } from 'react-native-paper';
import { UserAPI } from '../../service/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from "../../types/User";
import { useNavigation, Link } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Functional component for the user profile page.
 */
export default function ProfilePage() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [user, setUser] = useState<UserType | null>(null);

  /**
   * Handles the delete button press to prompt for confirmation and delete the user.
   */
  const handleDelete = () => {
    if (user) {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete your profile?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => deleteUser(user.id),
            style: 'destructive',
          },
        ]
      );
    }
  };

  /**
   * Deletes the user from the database and clears local storage upon confirmation.
   * @param id - ID of the user to be deleted.
   */
  const deleteUser = async (id: number) => {
    try {
      await UserAPI().deleteUserById(id);
      await AsyncStorage.removeItem("userId");
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', 'An error occurred while deleting your account.');
    }
  };

  /**
   * Effect hook to load the user data when the component mounts.
   */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userApi = UserAPI();
        const userId = Number(await AsyncStorage.getItem("userId"));
        const fetchedUser = await userApi.getUserById(userId);
        setUser(fetchedUser);
      } catch (error: any) {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          navigation.navigate('Login');
        } else {
          Alert.alert("User can't be loaded", "Please try again later");
        }
      }
    };

    loadUser();
  }, []);

  /**
   * Styles for components in the ProfilePage.
   */

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background
    },
    logoutButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#4A4458',
      borderRadius: 10,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontFamily: 'Roboto',
      margin: 10,

    },
    input: {
      width: 320,
      marginBottom: 12,
    },
    avatar: {
      width: 150,
      height: 150,
      margin: 20,

    },
    deleteButton: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.onError,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      borderWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
    },
    licenseInfo: {
      marginTop: 22,
      color: "white",
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="logout"
        iconColor="white"
        size={24}
        onPress={() => navigation.navigate('Logout')}
        style={styles.logoutButton}
      />
      <Text style={styles.title}>Profile</Text>
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?rounded=true&name=${user?.firstname}+${user?.lastname}&background=random&size=150`
        }}
        style={styles.avatar}
      />

      <TextInput
        style={styles.input}
        label="Email"
        mode="outlined"
        value={user?.email}
        disabled={true}
      />
      <TextInput
        style={styles.input}
        label="Firstname"
        mode="outlined"
        value={user?.firstname}
        disabled={true}
      />
      <TextInput
        style={styles.input}
        label="Lastname"
        mode="outlined"
        value={user?.lastname}
        disabled={true}
      />
      <TextInput
        style={styles.input}
        label="Age"
        mode="outlined"
        value={user?.age}
        disabled={true}
      />
      <IconButton
        icon="delete-outline"
        iconColor='white'
        style={styles.deleteButton}
        size={26}
        onPress={handleDelete}
      />
      <Link style={styles.licenseInfo} to={{ screen: 'EasterEgg' }}>License info</Link>
    </SafeAreaView>
  );
}


