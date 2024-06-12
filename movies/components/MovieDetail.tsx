import * as React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from "react";
import { MovieAPI } from '../service/Movie';
import { MovieType } from "../types/Movie";
import { useTheme } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';
import MovieDetailCard from './molecules/DetailMovieCard';
import MovieDetailSkeletonLoader from './molecules/MovieDetailSkeletonLoader';

function deleteMovie(id: number): void {
  MovieAPI().deleteMovieById(id);
}

export default function MovieDetail({ route } : any) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const { id } = route.params;
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.onBackground, 
    },
  });

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieApi = MovieAPI();
        const fetchedMovie = await movieApi.getMovieById(id);
        setMovie(fetchedMovie);
        setLoading(false); // Set loading to false once data is fetched
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

  const handleEdit = () => {
    if (movie) {
      navigation.navigate('EditMovie', { movieId: movie.id }); // Navigate to the EditMovie screen
    }
  };

  return (
    <>
      {loading ? (
          <MovieDetailSkeletonLoader/>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {movie && (
            <MovieDetailCard
              movie={movie}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </ScrollView>
      )}
    </>
  );
}
