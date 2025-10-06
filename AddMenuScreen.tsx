import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import type { MenuItem } from './HomeScreen'; // Adjust path if needed

interface AddMenuScreenProps {
  onAddDish: (newItem: MenuItem) => void;
  onNavigateBack: () => void;
}

const AddMenuScreen: React.FC<AddMenuScreenProps> = ({ onAddDish, onNavigateBack }) => {
  const [dishName, setDishName] = useState('');
  const [course, setCourse] = useState<MenuItem['course']>('Main Course');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!dishName || !description || !price) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName,
      course,
      description,
      price: parseFloat(price),
    };

    onAddDish(newItem);
    onNavigateBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Dish</Text>

      <TextInput
        placeholder="Dish Name"
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue as MenuItem['course'])}
          style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
        >
          <Picker.Item label="Appetizer" value="Appetizer" />
          <Picker.Item label="Main Course" value="Main Course" />
          <Picker.Item label="Dessert" value="Dessert" />
          <Picker.Item label="Beverage" value="Beverage" />
        </Picker>
      </View>

      <TextInput
        placeholder="Description"
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Dish</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateBack}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerIOS: {
    height: 150,
    width: '100%',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#dc3545',
    fontSize: 16,
  },
});
