import * as React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider, useTheme } from 'react-native-paper';
import MainStackNavigator from './navigation/MainNavigator';
import { StyleSheet } from 'react-native';
import { DarkScheme } from './components/theme/DarkScheme';

/**
 * Main application component.
 * Renders the navigation structure wrapped in necessary providers and themes.
 */
const App = () => {
  const theme = useTheme();

  return (
    <PaperProvider theme={DarkScheme}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={styles.container}>
          <MainStackNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1B20',
  },
});

export default App;
