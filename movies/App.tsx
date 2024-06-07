import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import MainStackNavigator from './navigation/MainNavigator';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
  <PaperProvider>
      <MainStackNavigator />
  </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
