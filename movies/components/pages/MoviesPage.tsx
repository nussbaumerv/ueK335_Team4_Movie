import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Divider, IconButton, Button } from 'react-native-paper'; 
import CustomButton from '../atoms/CustomButton';
import AddButton from '../atoms/AddButton';
import LogoutButton from '../atoms/LogoutButton';
import MovieCard from '../molecules/MovieCard';
import { useEffect, useState } from 'react';
import { MovieAPI } from '../../service/Movie';
import { MovieType } from '../../types/Movie';

export default function MoviePage() {
  const navigation = useNavigation();
  const theme = useTheme();
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [showBackToTop, setShowBackToTop] = React.useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<MovieType[] | null>(null);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [expandGenre, setExpandGenre] = useState(false);
  const [expandYear, setExpandYear] = useState(false);
  const [expandedModalHeight, setExpandedModalHeight] = useState(0);

  const handleScroll = (event: any) => {
    const { y } = event.nativeEvent.contentOffset;
    setShowBackToTop(y > 0); 
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieApi = MovieAPI();
        const fetchedMovies = await movieApi.getMovies();
        setMovies(fetchedMovies);
        setFilteredMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    loadMovies();
  }, []);

  const filterMoviesByYear = (year : string) => {
    if (year) {
      const filtered = movies?.filter(movie => movie.year === Number(year));
      setFilteredMovies(filtered);
      closeFilterModal();
    } else {
      setFilteredMovies(movies);
    }
  };

  const filterMoviesByGenre = (selectedGenre : string) => {
    if (selectedGenre) {
      const filtered = movies?.filter(movie => movie.genres?.includes(selectedGenre));
      setFilteredMovies(filtered);
      closeFilterModal();
    } else {
      setFilteredMovies(movies); // If no genre is selected, show all movies
    }
  };

  const toggleGenreFilter = () => {
    setExpandGenre(!expandGenre);
    if (!expandGenre) {
      setExpandYear(false);
    }
  };

  const toggleYearFilter = () => {
    setExpandYear(!expandYear);
    if (!expandYear) {
      setExpandGenre(false);
    }
  };

  const years = [
      "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012",
      "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000",
  ];

  const handleMoviePress = (movie: MovieType) => {
    navigation.navigate('MovieDetail', { id: movie.id });
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
    setExpandedModalHeight(0);
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
      marginTop: Dimensions.get('window').height * 0.225 + expandedModalHeight + 20,
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
    filterText: {
      fontSize: 20,
      marginBottom: 5,
    },
    filterButton: {

    },
    filterScrollView: {
      maxHeight: 300, 
      marginTop: 10, 
    },
    backButton : {
      position: 'absolute',
      top: 5,
      right: 10,
      zIndex: 1,
    },
    filterHeader: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    expandButton: {
      marginLeft: 10,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.onBackground, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterModal: {
      backgroundColor: '#141218', 
      padding: 20,
      position: 'relative',
      top: 200,
      borderRadius: 12,
      justifyContent: 'center',
    },
    buttonContent: {
      color: 'white',
    },
    filterOption: {
      fontSize: 18,
      marginBottom: 5,
      color: 'white', 
    },
    modalButtons : {
      color: 'white',
      backgroundColor: '#141218',
      width: '80%',
      borderRadius: 12,
      textAlign: 'left'
    }
  });

  const handleBackToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Supernatural",
    "Science Fiction",
    "Crime",
    "Mystery",
    "Thriller",
    "Adventure",
    "Fantasy",
    "War",
    "Superhero",
    "Family",
    "Romance",
    "Historical",
    "Political",
    "Teen",
    "Animated",
    "Sports"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <AddButton onPress={() => navigation.navigate('Home', { name: 'Home' })} iconName="plus" />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton onPress={openFilterModal} iconName="filter" />
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
        {filteredMovies &&
          filteredMovies.map((movie) => (
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={closeFilterModal}
      >
        <View>
        <View style={styles.filterModal} onLayout={(event) => {
  const { height } = event.nativeEvent.layout;
  setExpandedModalHeight(height);
}}>
            <IconButton
              icon="close"
              iconColor="red"
              size={24}
              onPress={closeFilterModal}
              style={styles.backButton}
            />
            <View style={styles.filterHeader}>
              <Button textColor="white" onPress={toggleGenreFilter} icon={expandGenre ? "arrow-down" : "arrow-right"} style={styles.modalButtons} >
                Genres
              </Button>
              <Button textColor="white" onPress={toggleYearFilter} icon={expandYear ? "arrow-down" : "arrow-right"} style={styles.modalButtons}>
                Years
              </Button>
            </View>
            <ScrollView style={styles.filterScrollView}>
              {expandGenre && genres.map((genre, index) => (
                <TouchableOpacity key={index} onPress={() => filterMoviesByGenre(genre)}>
                  <Text style={styles.filterOption}>{genre}</Text>
                </TouchableOpacity>
              ))}
              {expandYear && years.map((year, index) => (
                <TouchableOpacity key={index} onPress={() => filterMoviesByYear(year)}>
                  <Text style={styles.filterOption}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
