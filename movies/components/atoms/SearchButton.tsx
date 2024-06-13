import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
 
interface SearchButtonProps {
  onPress: () => void;
}
 
const SearchButton: React.FC<SearchButtonProps> = ({ onPress }) => {
  return (
<TouchableOpacity style={styles.button} onPress={onPress}>
<MaterialIcons name="search" size={24} color="white" />
</TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#393540',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 12,
  },
});
 
export default SearchButton;