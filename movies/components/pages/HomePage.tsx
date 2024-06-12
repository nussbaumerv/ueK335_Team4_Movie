import * as React from "react";
import { Text, Card, Button, IconButton } from "react-native-paper";
import { View, StyleSheet, SafeAreaView, Dimensions, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { MovieAPI } from "../../service/Movie";
import { MovieType } from "../../types/Movie";

const { width, height } = Dimensions.get('window');

export default function HomePage() {
  const navigation = useNavigation();
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    const loadRandomMovie = async () => {
      try {
        const movieApi = MovieAPI();
        const movies = await movieApi.getMovies(); 
        const randomMovie = movies[Math.floor(Math.random()* movies.length)];
        setMovie(randomMovie);
      } catch (error: any) {
        if (error.response && error.response.status === 403 || error.response && error.response.status === 401) {
            navigation.navigate('Login');
        } else {
          Alert.alert("Movies can't be loaded", "Please try again later");
          console.error('Error fetching movies:', error);
        }
    }
    };

    loadRandomMovie();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.backgroundView} />
      <Text variant="headlineLarge" style={styles.text}>
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
              onPress={() => navigation.navigate('Movies')}
              // onPress={() => navigation.navigate('MovieDetail', { movieID: movie?.id })}
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1D1B20',
  },
  backgroundView: {
    flex: 1,
    backgroundColor: '#1D1B20',
  },
  text: {
    position: 'absolute',
    top: height * 0.15,
    marginHorizontal: width * 0.08,
    color: 'white',
  },
  card: {
    position: 'absolute',
    top: height * 0.30,
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
