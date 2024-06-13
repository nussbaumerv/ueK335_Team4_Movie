import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Card, IconButton, useTheme } from 'react-native-paper';
import { MovieType } from '../../types/Movie';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_SUBTITLE_LENGTH_PERCENTAGE = 0.15;
const screenWidth = Dimensions.get('window').width;

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const subtitle = movie.extract;
  const maxSubtitleLength = Math.floor(MAX_SUBTITLE_LENGTH_PERCENTAGE * screenWidth);
  const truncatedSubtitle =
    subtitle.length > maxSubtitleLength ? subtitle.substring(0, maxSubtitleLength) + '...' : subtitle;

  const [rating, setRating] = React.useState(movie.rating || 0);
  const [isFavorite, setIsFavorite] = React.useState(movie.isFavorite || false);

  const theme = useTheme();

  const loadStoredMovies = async () => {
    try {
      const storedData = await AsyncStorage.getItem('movies_data');
      if (storedData) {
        return JSON.parse(storedData);
      }
      return null;
    } catch (error) {
      Alert.alert("Stored movies can't be loaded", "Please try again later");

      return null;
    }
  };

  
  const toggleFavorite = async (movieId: number) => {
    try {
      setIsFavorite(!isFavorite);

      const storedMovies = await loadStoredMovies() || { ratings: {}, favorites: [] };
      const index = storedMovies.favorites.indexOf(movieId);
      if (index !== -1) {
        storedMovies.favorites.splice(index, 1);
      } else {
        storedMovies.favorites.push(movieId); 
      }
      await AsyncStorage.setItem('movies_data', JSON.stringify(storedMovies));
      printAsyncStorage()
    } catch (error) {
      Alert.alert("Favorite can't be toggled", "Please try again later");
    }
  };

  React.useEffect(() => {
    const loadMovies = async () => {
      try {
        const storedMovies = await loadStoredMovies();

        if (storedMovies) {
          setIsFavorite(storedMovies.favorites.includes(movie.id));
          setRating(storedMovies.ratings && storedMovies.ratings[movie.id] ? storedMovies.ratings[movie.id] : 0);
        } else {
          setIsFavorite(false);
          setRating(0);
        }
      } catch (error) {
        Alert.alert("Movies can't be loaded", "Please try again later");
      }
    };

    loadMovies();
  }, []);

  const saveRating = async (movieId: number, rating: number) => {
    try {
      const storedMovies = await loadStoredMovies() || { ratings: {}, favorites: [] };
      storedMovies.ratings[movieId] = rating;
      await AsyncStorage.setItem('movies_data', JSON.stringify(storedMovies));
      setRating(rating);
      printAsyncStorage();
    } catch (error) {
      Alert.alert("Rating can't be saved", "Please try again later");
    }
  };

  const printAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      items.forEach(([key, value]) => {
      });
    } catch (error) {
      Alert.alert("Something went wrong", "Please try again later");
    }
  };

  const handleRating = (value: number) => {
    const newRating = value === rating ? 0 : value; // Toggle rating if same value is selected again
    setRating(newRating);
    saveRating(movie.id, newRating);
  };

  const renderStarIcon = (index: number) => {
    return index <= rating ? 'star' : 'star-outline';
  };

  const styles = StyleSheet.create({
    card: {
      margin: 5,
      backgroundColor: theme.colors.secondaryContainer,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    image: {
      width: screenWidth * 0.2,
      height: screenWidth * 0.27,
      borderRadius: 8,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      paddingTop: screenWidth * 0.04,
      paddingBottom: 10,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.onSurface,
    },
    ratingContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    starButton: {
      marginRight: 5,
    },
    favorite: {
      position: 'absolute',
      top: screenWidth * 0.04,
      right: screenWidth * 0.04,
    },
  });

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: movie.thumbnail }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>{truncatedSubtitle}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity key={index} onPress={() => handleRating(index)} style={styles.starButton}>
                <IconButton
                  icon={renderStarIcon(index)}
                  size={20}
                  iconColor={index <= rating ? '#FFD700' : '#A9A9A9'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(movie.id)} style={styles.favorite}>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            iconColor={isFavorite ? 'red' : '#A9A9A9'}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};



export default MovieCard;
