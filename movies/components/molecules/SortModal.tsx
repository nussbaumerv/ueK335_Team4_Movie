import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-paper';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSortByRating: () => void;
  onSortByFavorites: () => void;
  onSortByTitle: () => void;
  noSort: () => void;
}

const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSortByRating, onSortByFavorites, onSortByTitle, noSort }) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.sortModal}>
          <Text style={styles.modalOption} onPress={onSortByRating}>Sort by Rating</Text>
          <Text style={styles.modalOption} onPress={onSortByFavorites}>Sort by Favorites</Text>
          <Text style={styles.modalOption} onPress={onSortByTitle}>Sort by Title</Text>
          <Button mode="outlined" onPress={noSort} style={styles.closeButton}>Clear Sorting</Button>
          <Button mode="outlined" onPress={onClose} style={styles.closeButton}>Close</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sortModal: {
    backgroundColor: '#141218',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalOption: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    borderColor: 'white',
  },
});

export default SortModal;
