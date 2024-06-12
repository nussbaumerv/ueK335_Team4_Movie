import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesPage from '../components/pages/MoviesPage';
import MovieDetail from '../components/MovieDetail';
import MovieEdit from '../components/pages/MovieEdit';

const Stack = createStackNavigator();

export default function MoviesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MoviesList" component={MoviesPage} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
      <Stack.Screen name="MoviesSubPage" component={MoviesPage}/>
      <Stack.Screen name="EditMovie" component={MovieEdit} />
    </Stack.Navigator>
  );
}
