import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Divider, IconButton, Button, Chip } from 'react-native-paper';
import CustomButton from '../atoms/CustomButton';
import AddButton from '../atoms/AddButton';
import LogoutButton from '../atoms/LogoutButton';
import MovieCard from '../molecules/MovieCard';
import { useEffect, useState } from 'react';
import { MovieAPI } from '../../service/Movie';
import { MovieType } from '../../types/Movie';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SortModal from '../molecules/SortModal';
import { MovieTypeWithExtras } from '../../types/MovieWithExtras';

export default function MoviePage() {
  const navigation = useNavigation();
  const theme = useTheme();
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [showBackToTop, setShowBackToTop] = React.useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[] | MovieTypeWithExtras[] | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<MovieType[] | MovieTypeWithExtras[] | null>(null);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [expandGenre, setExpandGenre] = useState(false);
  const [expandYear, setExpandYear] = useState(false);
  const [expandedModalHeight, setExpandedModalHeight] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSorter, setActiveSorter] = useState<string | null>(null);

  const handleScroll = (event: any) => {
    const { y } = event.nativeEvent.contentOffset;
    setShowBackToTop(y > 0);
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieApi = MovieAPI();
        const fetchedMovies = await movieApi.getMovies();
        const storedMovies = await loadStoredMovies(); // Load stored movie data

        if (storedMovies) {
          // Merge fetched movies with stored ratings and favorite status
          const mergedMovies = fetchedMovies.map(movie => ({
            ...movie,
            rating: storedMovies.ratings[movie.id] || 0,
            isFavorite: storedMovies.favorites.includes(movie.id),
          }));
          setMovies(mergedMovies);
          setFilteredMovies(mergedMovies);
        } else {
          setMovies(fetchedMovies);
          setFilteredMovies(fetchedMovies);
        }
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    loadMovies();
  }, []);

  const loadStoredMovies = async () => {
    try {
      const storedData = await AsyncStorage.getItem('movies_data');
      if (storedData) {
        return JSON.parse(storedData);
      }
      return null;
    } catch (error) {
      console.error('Error loading stored movies', error);
      return null;
    }
  };

  const filterMoviesByYear = (year: string) => {
    if (year) {
      const filtered = filteredMovies?.filter(movie => movie.year === Number(year));
      setFilteredMovies(filtered);
      setSelectedYear(year);
      setSelectedGenre(null);
      setActiveFilter(`Year: ${year}`);
      closeFilterModal();
    } else {
      setFilteredMovies(movies);
      setActiveFilter(null);
    }
  };

  const filterMoviesByGenre = (selectedGenre: string) => {
    if (selectedGenre) {
      const filtered = filteredMovies?.filter(movie => movie.genres?.includes(selectedGenre));
      setFilteredMovies(filtered);
      setSelectedGenre(selectedGenre);
      setSelectedYear(null);
      setActiveFilter(`Genre: ${selectedGenre}`);
      closeFilterModal();
    } else {
      setFilteredMovies(movies);
      setActiveFilter(null);
    }
  };

  const clearFilter = () => {
    setFilteredMovies(movies);
    setSelectedGenre(null);
    setSelectedYear(null);
    setActiveFilter(null);
    setActiveSorter(null);
    closeSortModal();
  };

  const clearSorter = () => {
    setFilteredMovies(movies);
    setActiveSorter(null);
    closeSortModal();
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

  const openSortModal = () => {
    setShowSortModal(true);
  };

  const closeSortModal = () => {
    setShowSortModal(false);
  };

  const sortMoviesByRating = () => {
    clearSort();
    const sortedMovies = [...(filteredMovies || [])].sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      return ratingB - ratingA; // Sort in descending order based on rating
    });
    setFilteredMovies(sortedMovies);
    setActiveSorter('Rating');
    closeSortModal();
  };

  const sortMoviesByFavorites = () => {
    clearSort();
    const sortedMovies = [...(filteredMovies || [])].sort((a, b) => {
      const favoriteA = a.isFavorite ? 1 : 0;
      const favoriteB = b.isFavorite ? 1 : 0;
      return favoriteB - favoriteA;
    });
    setFilteredMovies(sortedMovies);
    setActiveSorter('Favorites');
    closeSortModal();
  };

  const clearSort = () => {
    setFilteredMovies(movies); // Reset filtered movies to original list
    setSelectedYear(null);
    setActiveFilter(null);
  };

  const sortMoviesByTitle = () => {
    clearSort();
    const sortedMovies = [...(filteredMovies || [])].sort((a, b) => a.title.localeCompare(b.title));
    setFilteredMovies(sortedMovies);
    setActiveSorter('Title');
    closeSortModal();
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
    filterChipContainer: {
      position: 'absolute',
      top: Dimensions.get('window').height * 0.162,
      right: Dimensions.get('window').width * 0.03,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    filterInnerChipContainer: {
      position: 'absolute',
      top: Dimensions.get('window').height * 0.03,
      right: Dimensions.get('window').width * 0.0005,
      flexDirection: 'row',
      flexWrap: 'wrap',
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
      marginTop: Dimensions.get('window').height * 0.225 + expandedModalHeight + 10,
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
      color: 'white',
      fontSize: 20,
      marginBottom: 5,
    },
    filterButton: {},
    filterScrollView: {
      maxHeight: 300,
      marginTop: 10,
    },
    backButton: {
      position: 'absolute',
      top: Dimensions.get('window').height * 0.075,
      left: Dimensions.get('window').width * 0.015,
      margin: 10,
      zIndex: 1,
    },
    filterModal: {
      backgroundColor: '#141218',
      padding: 20,
      borderRadius: 12,
      width: '80%',
      alignItems: 'center',
    },
    sortModal: {
      backgroundColor: '#141218',
      padding: 20,
      borderRadius: 12,
      width: '80%',
      alignItems: 'center',
    },
    modalOption: {
      fontSize: 18,
      color: 'white',
      marginVertical: 10,
    },
    closeButton: {
      marginTop: 20,
      borderColor: 'white',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterHeader: {
      fontSize: 18,
      color: 'white',
      marginVertical: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <AddButton onPress={() => navigation.navigate('MovieAdd', { name: 'MovieAdd' })} iconName="plus" />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton onPress={openFilterModal} iconName="filter" />
        </View>
        <View style={[styles.buttonWrapper, { marginRight: 0 }]}>
          <CustomButton onPress={openSortModal} iconName="sort" />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <LogoutButton onPress={() => navigation.navigate('Screen4', { name: 'Screen4' })} />
        </View>
      </View>
      <View style={styles.filterChipContainer}>
      {activeSorter && <Text style={{ color: 'white', marginLeft: 10 }}>Sorting by: {activeSorter}</Text>}
      <View style={styles.filterInnerChipContainer}>
        {selectedGenre && <Chip onClose={clearFilter}>Genre: {selectedGenre}</Chip>}
        {selectedYear && <Chip onClose={clearFilter}>Year: {selectedYear}</Chip>}
      </View>
      </View>
      <ScrollView ref={scrollViewRef} style={styles.movieContainer} onScroll={handleScroll}>
        {filteredMovies && filteredMovies.map(movie => (
          <TouchableOpacity key={movie.id} onPress={() => handleMoviePress(movie)}>
            <MovieCard key={movie.id} movie={movie} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {showBackToTop && (
        <TouchableOpacity
          style={styles.backToTopButton}
          onPress={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
        >
          <SimpleLineIcons name="arrow-up" style={styles.arrowUpIcon} />
        </TouchableOpacity>
      )}
      <Modal visible={showFilterModal} onRequestClose={closeFilterModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.filterModal}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterText}>Filter by Genre:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={toggleGenreFilter}>
                  <Text style={{ fontSize: 18, color: '#aaa' }}>{selectedGenre || 'Select Genre'}</Text>
                </TouchableOpacity>
                <IconButton
                  icon={expandGenre ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  onPress={toggleGenreFilter}
                  style={styles.expandButton}
                />
              </View>
              {expandGenre && (
                <ScrollView style={styles.filterScrollView}>
                  {genres.map(genre => (
                    <TouchableOpacity key={genre} onPress={() => filterMoviesByGenre(genre)}>
                      <Text style={{ fontSize: 16, marginVertical: 5, color: 'white' }}>{genre}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            <View style={styles.filterHeader}>
              <Text style={styles.filterText}>Filter by Year:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={toggleYearFilter}>
                  <Text style={{ fontSize: 18, color: '#aaa' }}>{selectedYear || 'Select Year'}</Text>
                </TouchableOpacity>
                <IconButton
                  icon={expandYear ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  onPress={toggleYearFilter}
                  style={styles.expandButton}
                />
              </View>
              {expandYear && (
                <ScrollView style={styles.filterScrollView}>
                  {years.map(year => (
                    <TouchableOpacity key={year} onPress={() => filterMoviesByYear(year)}>
                      <Text style={{ fontSize: 16, marginVertical: 5, color: 'white' }}>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            <Button mode="outlined" onPress={clearFilter} style={styles.closeButton}>
              Clear Filter
            </Button>
            <Button mode="outlined" onPress={closeFilterModal} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
      <SortModal
        visible={showSortModal}
        onClose={closeSortModal}
        onSortByRating={sortMoviesByRating}
        onSortByFavorites={sortMoviesByFavorites}
        onSortByTitle={sortMoviesByTitle}
        noSort={clearSorter}
      />
    </View>
  );
}

export type MovieTypeWithExtras = MovieType & {
  rating?: number;
  isFavorite?: boolean;
};
