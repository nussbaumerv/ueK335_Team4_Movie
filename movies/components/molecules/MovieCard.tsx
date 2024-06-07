import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

const MAX_SUBTITLE_LENGTH_PERCENTAGE = 0.15;
const screenWidth = Dimensions.get('window').width;

const MovieCard = () => {
  const subtitle = 'This is a long subtitle that needs to be truncated bsasfdasfasdfsdafsdaffsefsadfasfes';
  const maxSubtitleLength = Math.floor(MAX_SUBTITLE_LENGTH_PERCENTAGE * screenWidth);
  const truncatedSubtitle =
    subtitle.length > maxSubtitleLength ? subtitle.substring(0, maxSubtitleLength) + '...' : subtitle;

  const [rating, setRating] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleRating = (value : any) => {
    setRating(value);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStarIcon = (index : any) => {
    return index <= rating ? 'star' : 'star-outline';
  };

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Card Title</Text>
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
        <TouchableOpacity onPress={toggleFavorite} style={styles.favorite}>
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

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: '#141218'
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
    color: 'white',
    paddingTop: screenWidth * 0.04,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
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

export default MovieCard;
