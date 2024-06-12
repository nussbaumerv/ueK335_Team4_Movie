import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Register1Form from './components/pages/Register1Page';

export default function Register1() {
  return (
      <PaperProvider>
        <View style={styles.container}>
          <Register1Form></Register1Form>
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});