import * as React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import { MovieAPI } from '../service/Movie';
import { MovieType } from "../types/Movie";
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MovieDetailCard from './molecules/DetailMovieCard';

function deleteMovie(id: number): void {
  MovieAPI().deleteMovieById(id);
}

export default function MovieDetail({ route } : any) {
  const navigation = useNavigation();

  const [movie, setMovie] = useState<MovieType | null>(null);

  const { id } = route.params;

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieApi = MovieAPI();
        const fetchedMovie = await movieApi.getMovieById(id);
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
            onPress: () => {
              deleteMovie(movie.id);
              navigation.navigate('Movies', { name: 'Movies' });
            },
            style: 'destructive',
          },
        ]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movie && (
        <MovieDetailCard
          movie={movie}
          onDelete={handleDelete}
          onBack={() => navigation.navigate('Movies', { name: 'Movies' })}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
