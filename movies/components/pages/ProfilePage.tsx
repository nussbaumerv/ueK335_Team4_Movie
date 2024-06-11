import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Image, View, StyleSheet } from 'react-native';
import { Text, TextInput, IconButton } from 'react-native-paper';
import { UserAPI } from '../../service/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from "../../types/User";
import { useNavigation, useRoute, Link } from '@react-navigation/native';




function ProfilePage() {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserType | null>(null);


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

  const deleteUser = async (id: number) => {
    try {
      await UserAPI().deleteUserById(id);
      await AsyncStorage.removeItem("userId");
      navigation.navigate('LoginForm');
    } catch (error: any) {
        Alert.alert('Error', 'An error occurred while deleting your account.');
    }
  };

  useEffect(() => {
    const loadUser = async () => {
        try {
            const userApi = UserAPI();
            const userId = Number(await AsyncStorage.getItem("userId"));
            const fetchedUser = await userApi.getUserById(userId);
            setUser(fetchedUser);
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                navigation.navigate('LoginForm');
            } else {
              Alert.alert("Error", "User can't be loaded");
              console.error('Error fetching user by ID:', error);
            }
        }
    };

    loadUser();
}, []);

  return (
    <View style={styles.container}>
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
        icon="delete"
        containerColor="#DC362E"
        iconColor='white'
        size={26}
        onPress={handleDelete}
      />
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
    color: "#DC362E",

  }
});

export default ProfilePage;