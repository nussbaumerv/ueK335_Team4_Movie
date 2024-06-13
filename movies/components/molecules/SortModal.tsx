import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSortByRating: () => void;
  onSortByFavorites: () => void;
  onSortByTitle: () => void;
  noSort: () => void;
}




const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSortByRating, onSortByFavorites, onSortByTitle, noSort}) => {

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sortModal: {
      backgroundColor: theme.colors.inverseOnSurface,
      padding: 20,
      borderRadius: 12,
      width: '80%',
      alignItems: 'center',
    },
    modalOption: {
      fontSize: 18,
      color: theme.colors.onSurface,
      marginVertical: 10,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: theme.colors.onError,
    },
    closeButtonText: {
      color: theme.colors.error,
    },
    clearButton: {
      marginTop: 20,
      backgroundColor: theme.colors.secondaryContainer,
    },
    clearButtonText: {
      color: theme.colors.onSecondaryContainer,
    },
  });

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.sortModal}>
          <Text style={styles.modalOption} onPress={onSortByRating}>Sort by Rating</Text>
          <Text style={styles.modalOption} onPress={onSortByFavorites}>Sort by Favorites</Text>
          <Text style={styles.modalOption} onPress={onSortByTitle}>Sort by Title</Text>
          <Button onPress={noSort} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Filter</Text>
          </Button>
          <Button onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};



export default SortModal;
