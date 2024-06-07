import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

export default function HomePage() {

  const navigation = useNavigation();

  const theme = useTheme();

  return (
  <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.onBackground }}>
      <Text>Home Screen</Text>

    <Button
          title="MoviePage"
          onPress={() =>
            navigation.navigate('Movies', {name: 'Movies'})
          }
      >
      <Text>Discover More</Text>
      </Button>
      </View>
      </>
  );
}