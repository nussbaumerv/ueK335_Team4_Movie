import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme, Divider, IconButton, Button, Chip } from 'react-native-paper';
import CustomButton from '../atoms/CustomButton';
import AddButton from '../atoms/AddButton';
import SearchButton from '../atoms/SearchButton';
import MovieCard from '../molecules/MovieCard';
import { useState } from 'react';
import { MovieAPI } from '../../service/Movie';
import { MovieType } from '../../types/Movie';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SortModal from '../molecules/SortModal';
import { MovieTypeWithExtras } from '../../types/MovieWithExtras';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

/**
 * The MoviePage component displays a list of movies and provides filtering, sorting, and search functionality.
 */
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
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles the scroll event and sets the showBackToTop state.
   * @param event - The scroll event object.
   */
  const handleScroll = (event: any) => {
    const { y } = event.nativeEvent.contentOffset;
    setShowBackToTop(y > 0);
    if (y === 0) {
      loadMovies();
       // Reload movies when scrolled to the top
    }
  };

  const loadMovies = async () => {
    try {
      setLoading(true); // Show activity indicator
  
      const movieApi = MovieAPI();
      const fetchedMovies = await movieApi.getMovies();
      const storedMovies = await loadStoredMovies(); // Load stored movie data
  
      let updatedMovies = fetchedMovies;
  
      // Merge fetched movies with stored ratings and favorite status if storedMovies exist
      if (storedMovies) {
        updatedMovies = fetchedMovies.map(movie => ({
          ...movie,
          rating: storedMovies.ratings[movie.id] || 0,
          isFavorite: storedMovies.favorites.includes(movie.id),
        }));
      }
  
      // Apply sorting if activeSorter is set
      if (activeSorter) {
        switch (activeSorter) {
          case 'Rating':
            updatedMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case 'Favorites':
            updatedMovies.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
            break;
          case 'Title':
            updatedMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
          default:
            break;
        }
      }
  
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
      setLoading(false); // Hide activity indicator
    } catch (error) {
      setLoading(false); // Hide activity indicator on error
      Alert.alert("Movies can't be loaded", "Please try again later");
    }
  };
  
  

  /**
   * Loads movies from the API and retrieves stored movie data when the component is focused.
   */
  useFocusEffect(
    React.useCallback(() => {
      loadMovies(); // Call immediately on focus
    }, []) // Empty dependency array ensures it runs only on focus changes
  );


  /**
   * Loads stored movie data from AsyncStorage.
   * @returns The stored movie data or null if there is an error.
   */
  const loadStoredMovies = async () => {
    try {
      const storedData = await AsyncStorage.getItem('movies_data');
      if (storedData) {
        return JSON.parse(storedData);
      }
      return null;
    } catch (error) {
      Alert.alert("Favorites can't be loaded", "Please try again later");
      return null;
    }
  };

  /**
   * Filters movies by year and updates the filteredMovies state.
   * @param year - The year to filter by.
   */
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

  /**
   * Filters movies by genre and updates the filteredMovies state.
   * @param selectedGenre - The genre to filter by.
   */
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

  /**
   * Clears the filter and resets the filteredMovies state to the original movies list.
   */
  const clearFilter = () => {
    setFilteredMovies(movies);
    setSelectedGenre(null);
    setSelectedYear(null);
    setActiveFilter(null);
    setActiveSorter(null);
    closeSortModal();
  };

  /**
   * Clears the sorter and resets the filteredMovies state to the original movies list.
   */
  const clearSorter = () => {
    setFilteredMovies(movies);
    setActiveSorter(null);
    closeSortModal();
  };

  /**
   * Clears the search query and resets the filteredMovies state to the original movies list.
   */
  const clearSearch = () => {
    setSearchQuery(null);
    setFilteredMovies(movies);
    closeSearchModal();
  };

  /**
   * Toggles the genre filter expansion.
   */
  const toggleGenreFilter = () => {
    setExpandGenre(!expandGenre);
    if (!expandGenre) {
      setExpandYear(false);
    }
  };

  /**
   * Toggles the year filter expansion.
   */
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

  /**
   * Navigates to the MovieDetail screen with the selected movie's ID.
   * @param movie - The movie object to display details for.
   */
  const handleMoviePress = (movie: MovieType) => {
    navigation.navigate('MovieDetail', { id: movie.id });
  };

  /**
   * Opens the filter modal.
   */
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
  const openSearchModal = () => {
    setShowSearchModal(true);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false); // Reset filtered movies to original list
  };

  const handleSearch = () => {
    const filtered = movies?.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredMovies(filtered);
    setActiveFilter(`Search: ${searchQuery}`);
    closeSearchModal();
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
    "Action", "Comedy", "Drama", "Horror", "Supernatural", "Science Fiction", "Crime", "Mystery", "Thriller", "Adventure", 
    "Fantasy", "War", "Superhero", "Family", "Romance", "Historical", "Political", "Teen", "Animated", "Sports"
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
      backgroundColor: theme.colors.secondary,
    },
    movieContainer: {
      marginTop: Dimensions.get('window').height * 0.225 + expandedModalHeight + 10,
    },
    backToTopButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: theme.colors.onSecondary,
      borderRadius: 30,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: showBackToTop ? 1 : 0,
    },
    backToTopIcon: {
      fontSize: 24,
      color: theme.colors.onSurface,
    },
    arrowUpIcon: {
      fontSize: 24,
      color: theme.colors.onSurface,
    },
    filterText: {
      color: theme.colors.onSurface,
      fontSize: 20,
      marginBottom: 5,
    },
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
      backgroundColor: theme.colors.inverseOnSurface,
      padding: 20,
      borderRadius: 12,
      width: '80%',
      alignItems: 'center',
    },
    sortModal: {
      backgroundColor: theme.colors.inverseOnSurface,
      padding: 20,
      borderRadius: 12,
      width: '80%',
      alignItems: 'center',
    },
    modalOption: {
      fontSize: 18,
      color: theme.colors.onSurface,
      marginVertical: 10,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: theme.colors.onError,
    },
    closeButtonText: {
      color: theme.colors.error,
    },
    clearButton: {
      marginTop: 20,
      backgroundColor: theme.colors.secondaryContainer,
    },
    clearButtonText: {
      color: theme.colors.onSecondaryContainer,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterHeader: {
      fontSize: 18,
      color: theme.colors.onSurface,
      marginVertical: 10,
    },
    searchInput: {
      width: '100%',
      padding: 10,
      marginVertical: 10,
      backgroundColor: theme.colors.surface,
      color: theme.colors.onSurface,
      borderRadius: 5,
    },
    expandButton : {
      color: theme.colors.onSecondary,
    }
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
          <SearchButton onPress={openSearchModal} />
        </View>
      </View>
      <View style={styles.filterChipContainer}>
        {activeSorter && <Text style={{ color: theme.colors.onSurface, marginLeft: 10 }}>Sorting by: {activeSorter}</Text>}
        <View style={styles.filterInnerChipContainer}>
          {selectedGenre && <Chip onClose={clearFilter}>Genre: {selectedGenre}</Chip>}
          {selectedYear && <Chip onClose={clearFilter}>Year: {selectedYear}</Chip>}
          {searchQuery && <Chip onClose={clearSearch}>Search: {searchQuery}</Chip>}
        </View>
      </View>
      <ScrollView ref={scrollViewRef} style={styles.movieContainer} onScroll={handleScroll}>
  {filteredMovies && filteredMovies.map(movie => (
    <TouchableOpacity key={movie.id} onPress={() => handleMoviePress(movie)}>
      <MovieCard key={movie.id} movie={movie} />
    </TouchableOpacity>
  ))}
</ScrollView>
{loading && (
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )}
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
                  <Text style={{ fontSize: 18, color:  theme.colors.onSurface }}>{selectedGenre || 'Select Genre'}</Text>
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
                      <Text style={{ fontSize: 16, marginVertical: 5, color: theme.colors.onSurface }}>{genre}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            <View style={styles.filterHeader}>
              <Text style={styles.filterText}>Filter by Year:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={toggleYearFilter}>
                  <Text style={{ fontSize: 18, color: theme.colors.onSurface }}>{selectedYear || 'Select Year'}</Text>
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
                      <Text style={{ fontSize: 16, marginVertical: 5, color: theme.colors.onSurface }}>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            <Button onPress={clearFilter} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear Filter</Text>
            </Button>
            <Button onPress={closeFilterModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
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
      <Modal visible={showSearchModal} onRequestClose={closeSearchModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.filterModal}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by title..."
              placeholderTextColor={theme.colors.secondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <Button onPress={handleSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Search</Text>
            </Button>
            <Button onPress={clearSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear Search</Text>
            </Button>
            <Button onPress={closeSearchModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}