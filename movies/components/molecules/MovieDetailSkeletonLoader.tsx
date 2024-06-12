import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper'; // Import ActivityIndicator from React Native Paper

const MovieDetailSkeletonLoader = () => {

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.onBackground , // Background color
    },
  });

  return (
    <View style={styles.container}>
       <ActivityIndicator animating={true} color="#fff" size="large" />
    </View>
  );
};

export default MovieDetailSkeletonLoader;
