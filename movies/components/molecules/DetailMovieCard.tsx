import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, LogBox } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo vector icons

const MovieDetailCard = ({ movie, onDelete, onEdit }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    LogBox.ignoreLogs(["When setting overflow to hidden on Surface the shadow will not be displayed correctly"]);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            position: 'absolute',
            backgroundColor: theme.colors.onBackground,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%', 
        },
        card: {
            marginTop: Dimensions.get('window').height * 0.05,
            width: Dimensions.get('window').width * 0.8,
            backgroundColor: '#141218', // Card background color
            borderRadius: 12,
            overflow: 'hidden', // Fix for the warning
        },
        contentContainer: {
            borderRadius: 12,
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
            width: 40,
            height: 40,
            backgroundColor: '#393540',
            borderRadius: 12,
            borderWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
        },
        title: {
            flex: 1,
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
    });

    const titleMargin = movie.title.length > 5 ? 70 : 100;

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <IconButton
                            icon="arrow-left"
                            mode="contained"
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                            iconColor="white"
                        />
                        <Text style={[styles.title, { marginLeft: titleMargin }]}>{movie.title}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Card.Cover source={{ uri: movie.thumbnail }} style={styles.image} />
                    </View>
                    <ScrollView style={styles.scrollViewContent}
                    indicatorStyle="white" >
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
                    </ScrollView>
                    <Card.Actions style={styles.actions}>
                        <IconButton icon={() => <MaterialIcons name="edit" size={24} color="white" />} onPress={onEdit} style={styles.editButton} />
                        <IconButton icon={() => <MaterialIcons name="delete-outline" size={24} color="white" />} onPress={onDelete} style={styles.deleteButton} />
                    </Card.Actions>
                </View>
            </Card>
        </View>
    );
};

const formatExtract = (extract) => {
    return extract;
};

export default MovieDetailCard;
