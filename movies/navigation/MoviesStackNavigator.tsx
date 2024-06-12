import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesPage from '../components/pages/MoviesPage';
import MovieDetail from '../components/MovieDetail';

const Stack = createStackNavigator();

export default function MoviesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoviesList" component={MoviesPage} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}
