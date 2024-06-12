import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Divider, IconButton } from 'react-native-paper'; 
import CustomButton from '../atoms/CustomButton';
import AddButton from '../atoms/AddButton';
import LogoutButton from '../atoms/LogoutButton';
import MovieCard from '../molecules/MovieCard';
import { useEffect, useState } from 'react';
import { MovieAPI } from '../../service/Movie';
import { MovieType } from '../../types/Movie';
import MovieDetail from '../MovieDetail';

export default function MoviePage() {
  const navigation = useNavigation();
  const theme = useTheme();
  const scrollViewRef = React.useRef();
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  const handleScroll = (event : any) => {
    const { y } = event.nativeEvent.contentOffset;
    setShowBackToTop(y > 0); 
  };
  const [movies, setMovies] = useState<MovieType[] | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieApi = MovieAPI();
        const fetchedMovies = await movieApi.getMovies();
        setMovies(fetchedMovies);
        console.log(movies)
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    loadMovies();
  }, []);

  const handleMoviePress = (movie: MovieType) => {
    navigation.navigate('MovieDetail', { id: movie.id });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.onBackground,
      position: 'relative',
    },
    title: {
      fontSize: 32,
      fontFamily: 'Roboto',
      color: 'white',
      position: 'absolute',
      top: Dimensions.get('window').height * 0.07,
      left: Dimensions.get('window').width * 0.03,
      margin: 20,
    },
    buttonContainer: {
      position: 'absolute',
      top: Dimensions.get('window').height * 0.1,
      right: Dimensions.get('window').width * 0.03,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonWrapper: {
      marginRight: 6,
    },
    divider: {
      height: '120%',
      width: 1, 
      marginHorizontal: 10, 
      backgroundColor: '#49454F', 
    },
    movieContainer: {
      marginTop: Dimensions.get('window').height * 0.225,
    },
    backToTopButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: '#393540',
      borderRadius: 30,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: showBackToTop ? 1 : 0,
    },
    backToTopIcon: {
      fontSize: 24,
      color: 'white',
    },
    arrowUpIcon: {
      fontSize: 24,
      color: 'white',
    },
    
  });

  const handleBackToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <AddButton onPress={() => navigation.navigate('Home', { name: 'Home' })} iconName="plus" />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton onPress={() => navigation.navigate('Screen2', { name: 'Screen2' })} iconName="filter" />
        </View>
        <View style={[styles.buttonWrapper, { marginRight: 0 }]}>
          <CustomButton onPress={() => navigation.navigate('Screen3', { name: 'Screen3' })} iconName="sort" />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <LogoutButton onPress={() => navigation.navigate('Screen4', { name: 'Screen4' })} iconName="logout" />
        </View>
      </View>
      <ScrollView
        style={styles.movieContainer}
        scrollIndicatorInsets={{ right: 1 }} 
        ref={scrollViewRef}
        contentContainerStyle={{ paddingRight: 10 }} 
        showsVerticalScrollIndicator 
        indicatorStyle="white" 
        onScroll={handleScroll}
      >
        {movies &&
          movies.map((movie) => (
            <TouchableOpacity key={movie.id} onPress={() => handleMoviePress(movie)}>
              <MovieCard movie={movie} />
            </TouchableOpacity>
          ))}
      </ScrollView>
      {showBackToTop && (
        <TouchableOpacity style={styles.backToTopButton} onPress={handleBackToTop}>
          <IconButton icon="arrow-up" iconColor={styles.arrowUpIcon.color}/>
        </TouchableOpacity>
      )}
    </View>
  );
}
