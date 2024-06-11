import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { UserAPI } from '../../service/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from "../../types/User";
import 'react-native-gesture-handler';
import { useNavigation, Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const App = () => {
  const navigation = useNavigation();
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const dinoBottom = useRef(new Animated.Value(100)).current;
  const obstacleLeft = useRef(new Animated.Value(500)).current;
  const gameInterval = useRef(null);
  const obstacleSpeed = useRef(10);
  const speedIncreaseInterval = useRef(null);

  const emojis = ['🎞️', '📽️', '📀', '🎦', '⭐', '👥', '👤', '🎥', '🎬', '🍿', '🎭', '🎫', '📺', '🖥️', '🦸', '🦹', '👽', '🤖', '🥤', '👾', '🎟️', '📜', '📉', '📝', '📸', '🕶️', '🎧', '🎵', '🕵️', '🚀', '👑'];
  const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
  const [obstacleEmoji, setObstacleEmoji] = useState(randomEmoji());
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userApi = UserAPI();
      const userId = Number(await AsyncStorage.getItem("userId"));
      const fetchedUser = await userApi.getUserById(userId);
      setUser(fetchedUser);
    };

    loadUser();
  }, []);

  const jump = () => {
    if (!isGameOver && dinoBottom._value === 100) {
      Animated.sequence([
        Animated.timing(dinoBottom, {
          toValue: 350,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(dinoBottom, {
          toValue: 100,
          duration: 350,
          useNativeDriver: false,
          easing: Easing.in(Easing.cubic),
        }),
      ]).start();
    }
  };

  const startGame = () => {
    gameInterval.current = setInterval(() => {
      obstacleLeft.setValue(obstacleLeft._value - obstacleSpeed.current);

      if (obstacleLeft._value < -60) {
        setScore(prevScore => prevScore + 1);
        obstacleLeft.setValue(500);
        setObstacleEmoji(randomEmoji());

        if (score % 5 === 0) {
          obstacleSpeed.current += 1;
        }
      }

      if (
        obstacleLeft._value < 80 &&
        obstacleLeft._value > 30 &&
        dinoBottom._value < 170
      ) {
        gameOver();
      }
    }, 20);

    speedIncreaseInterval.current = setInterval(() => {
      obstacleSpeed.current += 0.2;
    }, 2000);
  };

  const gameOver = () => {
    setIsGameOver(true);
    clearInterval(gameInterval.current);
    clearInterval(speedIncreaseInterval.current);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setScore(0);
    obstacleSpeed.current = 8;
    dinoBottom.setValue(100);
    obstacleLeft.setValue(500);
    setObstacleEmoji(randomEmoji());
    startGame();
  };

  useEffect(() => {
    startGame();
    return () => {
      clearInterval(gameInterval.current);
      clearInterval(speedIncreaseInterval.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <TouchableOpacity onPress={jump} style={styles.gameArea} activeOpacity={1}>
        <Animated.View style={[styles.dino, { bottom: dinoBottom }]}>
          <Image
            source={{ uri: `https://ui-avatars.com/api/?rounded=true&name=${user?.firstname}+${user?.lastname}&background=random&size=150` }}
            style={styles.dinoImage}
          />
        </Animated.View>
        <Animated.View style={[styles.obstacle, { left: obstacleLeft }]}>
          <Text style={styles.emoji}>{obstacleEmoji}</Text>
        </Animated.View>
      </TouchableOpacity>
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOver}>Game Over</Text>
          <View style={styles.restartButtonContainer}>
            <Button mode="contained" onPress={restartGame}>Restart</Button>
          </View>
        </View>
      )}
      <Icon style={styles.backButton} size={40} name="arrow-left" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1B20',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  gameArea: {
    width: '100%',
    height: '100%',
    position: 'relative',
    top: '-5%',
  },
  dino: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 50,
  },
  dinoImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  obstacle: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 50,
  },
  score: {
    position: 'absolute',
    top: 100,
    fontSize: 24,
    color: '#fff',
  },
  gameOverContainer: {
    position: 'absolute',
    top: '42%',
    alignItems: 'center',
  },
  gameOver: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 20,
  },
  restartButtonContainer: {
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 95,
    left: 40,
    color: 'white',
  }
});

export default App;
