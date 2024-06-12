import * as React from 'react';
import { useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';

const MovieDetailCard = ({ movie, onDelete, onEdit, onBack }) => {
    const theme = useTheme();
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            position: 'relative',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
        },
        card: {
            marginTop: Dimensions.get('window').height * 0.15,
            width: Dimensions.get('window').width * 0.8,
            backgroundColor: '#141218', // Card background color
            borderRadius: 12,
            overflow: 'hidden',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            paddingBottom: 20,
        },
        backButton: {
            position: 'absolute',
            left: 10,
            top: Dimensions.get('window').height * 0.03,
        },
        title: {
            paddingTop: 30,
            fontSize: 32,
            fontFamily: 'Roboto',
            color: 'white', // Title text color
        },
        imageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },
        image: {
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').height * 0.3,
        },
        scrollViewContent: {
            height: Dimensions.get('window').height * 0.2,
        },
        subtitle: {
            fontSize: 18,
            marginTop: 10,
            marginBottom: 5,
            color: 'white', // Subtitle text color
        },
        normalText: {
            fontSize: 16,
            marginBottom: 10,
            color: 'white', // Normal text color
        },
        castText: {
            fontSize: 14,
            marginBottom: 5,
            color: 'white', // Cast text color
        },
        actions: {
            justifyContent: 'center',
            marginVertical: 10,
            flexDirection: 'row',
        },
        deleteButton: {
            width: 40,
            height: 40,
            backgroundColor: '#DC362E',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
            borderWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
        },
        editButton: {
            width: 40,
            height: 40,
            backgroundColor: '#393540',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
            borderWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
        },
        scrollIndicator: {
            fontSize: 24,
            textAlign: 'center',
            color: 'white',
            marginVertical: 10,
        },
    });

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrolledToEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
        setIsScrolledToEnd(isScrolledToEnd);
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.header}>
                    <IconButton
                        icon="arrow-left"
                        mode="contained"
                        onPress={onBack}
                        style={styles.backButton}
                        iconColor="white"
                    />
                    <Text style={styles.title}>{movie.title}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Card.Cover source={{ uri: movie.thumbnail }} style={styles.image} />
                </View>
                <ScrollView
                    style={styles.scrollViewContent}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <Card.Content>
                        <Text style={styles.subtitle}>Extract</Text>
                        <Text style={styles.normalText}>{formatExtract(movie.extract)}</Text>
                        <Text style={styles.subtitle}>Cast</Text>
                        {movie.cast.map((cast, index) => (
                            <Text key={index} style={styles.castText}>
                                {cast}
                            </Text>
                        ))}
                        <Text style={styles.subtitle}>Year</Text>
                        <Text style={styles.normalText}>{movie.year}</Text>
                        <Text style={styles.subtitle}>Genres</Text>
                        <Text style={styles.normalText}>{movie.genres.join(', ')}</Text>
                    </Card.Content>
                    {!isScrolledToEnd && <Text style={styles.scrollIndicator}>...</Text>}
                </ScrollView>
                <Card.Actions style={styles.actions}>
                    <IconButton icon="delete" size={24} onPress={onDelete} style={styles.deleteButton} iconColor="white" />
                    <IconButton icon="pen" size={24} onPress={onEdit} style={styles.editButton} iconColor="white" />
                </Card.Actions>
            </Card>
        </View>
    );
};

const formatExtract = (extract) => {
    return extract;
};

export default MovieDetailCard;
