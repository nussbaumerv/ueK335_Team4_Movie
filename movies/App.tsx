import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import {
  NavigationContainer,
} from '@react-navigation/native';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { DarkScheme } from './components/theme/DarkScheme';
import { useColorScheme } from 'react-native';

export default function App() {

const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
const Stack = createNativeStackNavigator();
const DarkTheme = {
    ...MD3DarkTheme,
    colors: DarkScheme
}
const colorScheme = useColorScheme();

  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Movies" component={MoviePage} />
            </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
};
