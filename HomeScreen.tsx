import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// --- 1. Define MenuItem Interface ---
// It's best practice to keep this in a separate types file, but defining it here 
// ensures the component is runnable if the external file is missing.
export interface MenuItem {
  id: string;
  dishName: string;
  course: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
  description: string;
  price: number;
}
// ------------------------------------

// --- 2. Home Screen Component ---
interface HomeScreenProps {
  menuItems: MenuItem[];
  onNavigateToAdd: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, onNavigateToAdd }) => {
  const totalItems = menuItems.length;

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={homeStyles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={homeStyles.dishName}>{item.dishName}</Text>
        {/* Added dynamic color for the course badge */}
        <Text style={[homeStyles.course, { color: getCourseColor(item.course) }]}>{item.course}</Text>
        <Text style={homeStyles.description}>{item.description}</Text>
      </View>
      <Text style={homeStyles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
  
  // Helper function for course color coding (New addition for UX)
  const getCourseColor = (course: MenuItem['course']) => {
    switch (course) {
      case 'Appetizer': return '#ffc107'; // Yellow
      case 'Main Course': return '#dc3545'; // Red
      case 'Dessert': return '#007bff'; // Blue
      case 'Beverage': return '#17a2b8'; // Teal
      default: return '#6c757d';
    }
  };


return (
    <View style={homeStyles.container}>
      {/* Menu Summary Section */}
      <View style={homeStyles.summaryBox}>
        <Text style={homeStyles.summaryText}>Total Menu Items:</Text>
        <Text style={homeStyles.totalText}>{totalItems}</Text>
      </View>

      {/* Menu List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // Corrected conditional styling
        contentContainerStyle={totalItems === 0 ? homeStyles.emptyListContainer : null}
        ListEmptyComponent={<Text style={homeStyles.emptyText}>Menu is empty. Press '+' to add a dish!</Text>}
      />

      {/* Add Button (Floating Action Button style) */}
      <TouchableOpacity 
        style={homeStyles.addButton} 
        onPress={onNavigateToAdd}
        activeOpacity={0.8}
      >
        <Text style={homeStyles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- 3. Sample Menu Items ---

export const sampleMenuItems: MenuItem[] = [
  // Main Courses
  { 
    id: '1', dishName: 'Filet Mignon', course: 'Main Course', 
    description: 'A tender cut of beef served with mashed potatoes and vegetables.', price: 29.99
  },
  { 
    id: '2', dishName: 'Chicken Parmesan', course: 'Main Course', 
    description: 'Breaded chicken topped with marinara sauce and mozzarella.', price: 22.99
  },

  // Appetizers
  { 
    id: '3', dishName: 'Spring Rolls', course: 'Appetizer', 
    description: 'Crispy rolls filled with vegetables and served with sweet sauce.', price: 6.99
  },
  
  // Desserts
  { 
    id: '4', dishName: 'Chocolate Lava Cake', course: 'Dessert', 
    description: 'A rich chocolate cake with a gooey, molten center.', price: 7.99
  },
  { 
    id: '5', dishName: 'Vanilla Bean Cheesecake', course: 'Dessert', 
    description: 'A smooth cheesecake topped with vanilla bean and a graham cracker crust.', price: 6.49
  },
  
  // Beverages
  { 
    id: '6', dishName: 'Iced Latte', course: 'Beverage', 
    description: 'Cold espresso mixed with ice and topped with milk.', price: 4.50
  },
  { 
    id: '7', dishName: 'Fresh Lemonade', course: 'Beverage', 
    description: 'A refreshing, tangy lemonade made from fresh squeezed lemons.', price: 3.25
  },
];

// --- 4. Styles ---
const homeStyles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
    backgroundColor: '#fff', // Added background for better appearance
  },
  summaryBox: {
    backgroundColor: '#e6f7ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // Simple shadow for Android
    shadowColor: '#000', // Simple shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  course: {
    fontSize: 14,
    fontWeight: 'bold', // Bolded course for emphasis
    marginTop: 2,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#999',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginLeft: 10,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30, // Increased distance from edge
    bottom: 30, // Increased distance from edge
    backgroundColor: '#dc3545', // Red color for 'Add' action
    borderRadius: 30,
    elevation: 5, // Floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 35,
    lineHeight: 35,
    marginBottom: 2, // Minor adjustment for visual centering
  },
});

export default HomeScreen;