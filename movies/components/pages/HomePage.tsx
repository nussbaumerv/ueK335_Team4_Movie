import * as React from "react";
import { Text, Card, Button, Avatar, IconButton } from "react-native-paper";
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.backgroundView} />
      <IconButton
        icon="logout"
        iconColor="white"
        size={24}
        onPress={() => console.log('Logout pressed')}
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
    marginTop: 20,
    marginHorizontal: 30,
    color: 'white',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4A4458',
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 20,  
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'white',
  },
  subhead: {
    color: 'white',
  },
  button: {
    backgroundColor: '#D0BCFF',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  cardCover: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
