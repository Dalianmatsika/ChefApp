import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface MenuItem {
  id: string;
  dishName: string;
  course: string; // Using 'string' for flexibility, assuming specific course names exist
  description: string;
  price: number;
}

interface FilterScreenProps {
  // menuItems is included for type compliance, but is not used in this component's logic.
  menuItems: MenuItem[]; 
  onNavigateBack: () => void; // Function to close the filter screen
  onApplyFilters: (filters: { course?: string; searchQuery?: string }) => void; // Function to send filters back
}

const FilterScreen: React.FC<FilterScreenProps> = ({ onNavigateBack, onApplyFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  // Use an empty string '' to represent the "All" course filter
  const [selectedCourse, setSelectedCourse] = useState<string>(''); 

  /**
   * Sends the current search query and selected course back to the parent component.
   */
  const handleApplyFilters = () => {
    // Trim whitespace from the search query before applying
    onApplyFilters({
      searchQuery: searchQuery.trim(), 
      course: selectedCourse,
    });
    
  };

  const CourseButton: React.FC<{ title: string; courseValue: string }> = ({ title, courseValue }) => (
    <TouchableOpacity
      style={[
        styles.courseButton,
        selectedCourse === courseValue ? styles.courseButtonSelected : styles.courseButtonUnselected,
      ]}
      onPress={() => setSelectedCourse(courseValue)}
    >
      <Text
        style={[
          styles.courseButtonText,
          selectedCourse === courseValue ? styles.courseButtonTextSelected : styles.courseButtonTextUnselected,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Back Button positioned at the top */}
      <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </TouchableOpacity>
      
      <Text style={styles.header}>🔍 Filter Menu</Text>

      {/* Search Input */}
      <Text style={styles.label}>Dish Name Search:</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a dish..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Course Filter Buttons */}
      <Text style={styles.label}>Select Course:</Text>
      <View style={styles.courseButtons}>
        {/* 'All' course maps to an empty string for the filter */}
        <CourseButton title="All" courseValue="" /> 
        <CourseButton title="Main Course" courseValue="Main Course" />
        <CourseButton title="Dessert" courseValue="Dessert" />
        <CourseButton title="Beverage" courseValue="Beverage" />
      </View>

      {/* Apply Filters Button */}
      <Button title="Apply Filters" onPress={handleApplyFilters} color="#4CAF50" />
      
    </View>
  );
};

// ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // White background for a clean look
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  searchInput: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  // --- Course Button Styling ---
  courseButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 5,
    minWidth: 70, // Ensure buttons are readable
    alignItems: 'center',
  },
  courseButtonSelected: {
    backgroundColor: '#387EF5', // Primary/Active color
    borderWidth: 1,
    borderColor: '#387EF5',
  },
  courseButtonUnselected: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  courseButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  courseButtonTextSelected: {
    color: '#fff', // White text for selected button
  },
  courseButtonTextUnselected: {
    color: '#555',
  },
  // --- Navigation Button Styling ---
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#387EF5', // Use primary color for link
    fontWeight: '600',
  },
});

export default FilterScreen;
