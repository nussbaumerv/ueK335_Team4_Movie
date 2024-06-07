import * as React from "react";
import { Text, Card, Button, IconButton } from "react-native-paper";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HomePage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.backgroundView} />
      <IconButton
        icon="logout"
        iconColor="white"
        size={24}
        onPress={() => navigation.navigate('Login')}
        style={styles.logoutButton}
      />
      <Text variant="headlineMedium" style={styles.text}>
        Hi Username, welcome to the home of movies ✨
      </Text>
      <Card mode="outlined" style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View>
              <Text variant="titleLarge" style={styles.title}>
                Movie title
              </Text>
              <Text variant="bodyMedium" style={styles.subhead}>
                Subhead
              </Text>
            </View>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={{ color: 'black' }}
              onPress={() => navigation.navigate('Movies')}
            >
              Discover More
            </Button>
          </View>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1D1B20',
  },
  backgroundView: {
    flex: 1,
    backgroundColor: '#1D1B20',
  },
  text: {
    position: 'absolute',
    top: height * 0.15,
    marginHorizontal: width * 0.08,
    color: 'white',
  },
  logoutButton: {
    position: 'absolute',
    top: height * 0.02,
    right: width * 0.05,
    backgroundColor: '#4A4458',
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    top: height * 0.30,
    left: width * 0.01,
    marginHorizontal: width * 0.04,
    borderRadius: 10,
    backgroundColor: 'black',
    width: width * 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -5,
  },
  title: {
    color: '#E6E0E9',
    fontSize: 15,
    fontWeight: 900,
  },
  subhead: {
    color: '#E6E0E9',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#D0BCFF',
    borderRadius: 20,
    paddingHorizontal: 5,
    marginRight: 10,
  },
  cardCover: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: height * 0.4,
  },
});
