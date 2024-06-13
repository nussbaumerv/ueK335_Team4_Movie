import * as React from "react";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { View, StyleSheet, SafeAreaView, Dimensions, Alert } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from "react";
import { MovieAPI } from "../../service/Movie";
import { MovieType } from "../../types/Movie";
import { UserAPI } from "../../service/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../types/User";

const { width, height } = Dimensions.get('window');

/**
 * Functional component representing the home page of the application.
 * Displays a random movie and greeting message based on user data.
 */
export default function HomePage() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [movie, setMovie] = useState<MovieType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  let feedbackGiven = false;

  useEffect(() => {
    /**
     * Function to load user data from AsyncStorage.
     */
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

  useFocusEffect(
    React.useCallback(() => {
      /**
       * Function to load a random movie from the API.
       */
      const loadRandomMovie = async () => {
        try {
          const movieApi = MovieAPI();
          const movies = await movieApi.getMovies();
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setMovie(randomMovie);
          feedbackGiven = false;
        } catch (error: any) {
          if (!feedbackGiven) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
              navigation.navigate('Login');
            } else {
              Alert.alert("Movie can't be loaded", "Please try again later");
            }
            feedbackGiven = true;
          }
        }
      };

      loadRandomMovie();
      intervalRef.current = setInterval(loadRandomMovie, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [])
  );

  /**
   * Styles for the HomePage component.
   */
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    backgroundView: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    greeting: {
      color: '#D0BCFF',
    },
    text: {
      position: 'absolute',
      top: height * 0.05,
      marginHorizontal: width * 0.08,
      color: 'white',
    },
    card: {
      position: 'absolute',
      top: height * 0.25,
      left: width * 0.01,
      marginHorizontal: width * 0.04,
      borderRadius: 10,
      backgroundColor: 'black',
      width: width * 0.9,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: -5,
    },
    cardText: {
      flex: 1,
      marginRight: 10,
    },
    title: {
      color: '#E6E0E9',
      fontSize: 15,
      fontWeight: '900',
    },
    subhead: {
      color: '#E6E0E9',
      fontSize: 13,
    },
    button: {
      backgroundColor: '#D0BCFF',
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    cardCover: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      height: height * 0.4,
      width: '100%',
    },
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.backgroundView} />
      <Text style={styles.text} variant="headlineLarge">
        <Text style={styles.greeting}>
          Hi, {user?.firstname} {"\n"}
        </Text>
        Welcome to the home of movies ✨
      </Text>
      <Card mode="outlined" style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.cardText}>
              <Text variant="titleLarge" style={styles.title}>
                {movie ? movie.title : "Loading..."}
              </Text>
              <Text variant="bodyMedium" style={styles.subhead}>
                {movie ? movie.year : "Loading..."}
              </Text>
            </View>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={{ color: 'black' }}
              onPress={() => navigation.navigate('MovieDetail', { id: movie?.id })}
            >
              View Movie
            </Button>
          </View>
        </Card.Content>
        {movie && (
          <Card.Cover source={{ uri: movie.thumbnail }} style={styles.cardCover} />
        )}
      </Card>
    </SafeAreaView>
  );
}
