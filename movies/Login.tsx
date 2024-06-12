import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import LoginForm from './components/pages/LoginPage';

export default function Login() {
  return (
      <PaperProvider>
        <View style={styles.container}>
          <LoginForm></LoginForm>
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