import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import { MovieAPI } from '../service/Movie';
import { MovieType } from "../types/Movie";
import { Button } from 'react-native-paper';

function deleteMovie(id: number): void {
  MovieAPI().deleteMovieById(id);
}

export default function MovieDetail() {
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieApi = MovieAPI();
        const fetchedMovie = await movieApi.getMovieById(1);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error('Error fetching movie by ID:', error);
      }
    };

    loadMovie();
  }, []);

  const handleDelete = () => {
    if (movie) {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete ${movie.title}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => MovieAPI().deleteMovieById(movie.id),
            style: 'destructive',
          },
        ]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{movie?.title}</Text>
      <Image
        source={{ uri: movie?.thumbnail }}
        style={{ width: movie?.thumbnail_width, height: movie?.thumbnail_height }}
      />
      <Text style={styles.subtitle}>Extract</Text>
      <Text style={styles.normalText}>{movie?.extract}</Text>
      <Text style={styles.subtitle}>Cast</Text>
      <Text style={styles.normalText}>{movie?.cast}</Text>
      <Button icon="delete" mode="contained" onPress={handleDelete}>
        Delete  
      </Button>
      <Button icon="pencil" mode="contained" onPress={() => console.log('Pressed')}>
        Edit  
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto',
    margin: 20,
  },

  subtitle: {
    fontSize: 20,
    margin: 10,
  },

  normalText: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  }
});