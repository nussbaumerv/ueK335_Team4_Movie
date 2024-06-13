import * as React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from "react";
import { MovieAPI } from '../../service/Movie';
import { MovieType } from "../../types/Movie";
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MovieDetailCard from '../molecules/DetailMovieCard';
import MovieDetailSkeletonLoader from '../molecules/MovieDetailSkeletonLoader';

/**
 * Deletes a movie by its ID.
 * @param id - The ID of the movie to delete.
 */
function deleteMovie(id: number): void {
  MovieAPI().deleteMovieById(id);
}

/**
 * The MovieDetailPage component displays details of a movie and provides options to delete or edit it.
 * @param route - The route object containing the movie ID as a parameter.
 */
export default function MovieDetailPage({ route }: any) {
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

  /**
   * Loads the movie details from the API based on the provided ID.
   */
  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieApi = MovieAPI();
        const fetchedMovie = await movieApi.getMovieById(id);
        setMovie(fetchedMovie);
        setLoading(false);
      } catch (error) {
        Alert.alert("Movie can't be loaded", "Please try again later");
      }
    };

    loadMovie();
  }, [route]);

  /**
   * Handles the deletion of the movie.
   * Displays an alert to confirm the deletion and navigates to the Movies screen upon confirmation.
   */
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

  /**
   * Handles the editing of the movie.
   * Navigates to the EditMovie screen with the movie ID as a parameter.
   */
  const handleEdit = () => {
    if (movie) {
      navigation.navigate('EditMovie', { movieId: movie.id });
    }
  };

  return (
    <>
      {loading ? (
        <MovieDetailSkeletonLoader />
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