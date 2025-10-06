import React from 'react';  
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export interface MenuItem {
  id: string;
  dishName: string;
  course: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
  description: string;
  price: number;
}

interface HomeScreenProps {
  menuItems: MenuItem[];
  onNavigateToAdd: () => void;
}
const getCourseColor = (course: MenuItem['course']) => {
  switch (course) {
    case 'Appetizer': return '#ffc107'; // Yellow
    case 'Main Course': return '#dc3545'; // Red
    case 'Dessert': return '#007bff'; // Blue
    case 'Beverage': return '#17a2b8'; // Teal
    default: return '#6c757d';
  }
};

const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, onNavigateToAdd }) => {
  const totalItems = menuItems.length;

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={homeStyles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={homeStyles.dishName}>{item.dishName}</Text>
        <Text style={[homeStyles.course, { color: getCourseColor(item.course) }]}>{item.course}</Text>
        <Text style={homeStyles.description}>{item.description}</Text>
      </View>
      <Text style={homeStyles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );

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
        contentContainerStyle={totalItems === 0 ? homeStyles.emptyListContainer : null}
        ListEmptyComponent={<Text style={homeStyles.emptyText}>Menu is empty. Press '+' to add a dish!</Text>}
      />

      {/* Add Button */}
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

const homeStyles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
    backgroundColor: '#fff',
  },
  summaryBox: {
    backgroundColor: '#e6f7ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
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
    fontWeight: 'bold',
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
    right: 30,
    bottom: 30,
    backgroundColor: '#35dcceff',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 35,
    lineHeight: 35,
    marginBottom: 2,
  },
});

export default HomeScreen;
