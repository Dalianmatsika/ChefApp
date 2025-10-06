import React, { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

// =================================================================
//                 ✅ ADDED: MISSING HOME SCREEN DEFS
// =================================================================
export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  price: number;
  course: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
}

export const sampleMenuItems: MenuItem[] = [
  { id: '1', dishName: 'Caesar Salad', description: 'Classic starter with romaine lettuce and croutons.', price: 129.99, course: 'Appetizer' },
  { id: '2', dishName: 'Steak Frites', description: 'Grilled sirloin steak with crispy fries.', price: 124.50, course: 'Main Course' },
  { id: '3', dishName: 'Chocolate Lava Cake', description: 'Warm cake with a molten chocolate center.', price: 128.00, course: 'Dessert' },
  { id: '4', dishName: 'Espresso', description: 'Strong, concentrated coffee shot.', price: 113.50, course: 'Beverage' },
];

// Placeholder for the imported HomeScreen component (you seem to render its logic inline)
const HomeScreen: React.FC<any> = ({ children }) => <>{children}</>;
// =================================================================

// =================================================================
//                 ✅ ADDED: MISSING SCREEN COMPONENTS
// =================================================================

// Placeholder for FilterScreen
const FilterScreen: React.FC<any> = ({ onApplyFilters, onNavigateBack }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchText, setSearchText] = useState('');

  return (
    <View style={appStyles.centeredContainer}>
      <Text style={appStyles.placeholderText}>Filter Screen</Text>
      <TextInput
        style={filterStyles.input}
        placeholder="Search dish name..."
        value={searchText}
        onChangeText={setSearchText}
      />
      {/* Simple course filter example */}
      <Button title={`Filter by ${selectedCourse || 'All Courses'}`} onPress={() => Alert.alert('Course Selection Placeholder')} />
      <View style={{ height: 10 }} />
      <Button
        title="Apply Filters"
        onPress={() => onApplyFilters({ course: selectedCourse, searchQuery: searchText })}
        color="#28a745"
      />
      <View style={{ height: 10 }} />
      <Button title="Cancel" onPress={onNavigateBack} color="#6c757d" />
    </View>
  );
};

// Placeholder for MenuItemScreen
const MenuItemScreen: React.FC<ItemDetailsProps> = ({ route }) => {
  const { item } = route.params;
  return (
    <View style={appStyles.centeredContainer}>
      <Text style={appStyles.placeholderText}>{item.dishName} Details</Text>
      <Text style={appStyles.placeholderSubText}>{item.description}</Text>
      <Text style={[appStyles.placeholderSubText, { color: '#dc3545' }]}>Price: R{item.price.toFixed(2)}</Text>
    </View>
  );
};

// Placeholder for AddMenuScreen
const AddMenuScreen: React.FC<{ onAddMenuItem: (item: MenuItem) => void; navigation: any }> = ({ onAddMenuItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<MenuItem['course']>('Appetizer');

  const handleSave = () => {
    if (!name || !price || isNaN(parseFloat(price))) {
      Alert.alert('Error', 'Please enter a valid dish name and price.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(), // Simple ID generation
      dishName: name,
      description: description || 'No description provided.',
      price: parseFloat(price),
      course: course,
    };

    onAddMenuItem(newItem);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={appStyles.placeholderText}>Add New Dish</Text>
      <TextInput style={filterStyles.input} placeholder="Dish Name" value={name} onChangeText={setName} />
      <TextInput style={filterStyles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput
        style={filterStyles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      {/* Simple course selection */}
      <Text style={{ marginTop: 15, fontSize: 16 }}>Course: {course}</Text>
      <Button title={`Set Course: ${course}`} onPress={() => Alert.alert('Course Selector Placeholder')} />
      <View style={{ height: 20 }} />
      <Button title="Save Dish" onPress={handleSave} color="#28a745" />
    </View>
  );
};
// =================================================================

// --- Type Definitions for Navigation ---
type RootStackParamList = {
  Home: {
    menuItems: MenuItem[];
    onNavigateToAdd: () => void;
    onNavigateToFilter: () => void;
    onViewItem: (item: MenuItem) => void;
  };
  Filter: {
    menuItems: MenuItem[];
    onNavigateBack: () => void;
    onApplyFilters: (filters: { course?: string; searchQuery?: string }) => void;
  };
  ItemDetails: { item: MenuItem };
  AddDish: undefined;
};

type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;
type FilterProps = StackScreenProps<RootStackParamList, 'Filter'>;
type ItemDetailsProps = StackScreenProps<RootStackParamList, 'ItemDetails'>;
type AddDishProps = StackScreenProps<RootStackParamList, 'AddDish'>;

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);
  const [filters, setFilters] = useState<{ course?: string; searchQuery?: string }>({
    course: '',
    searchQuery: '',
  });

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCourse = !filters.course || item.course === filters.course;
      const matchesSearch =
        !filters.searchQuery || item.dishName.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    });
  }, [menuItems, filters]);

  const WrappedFilterScreen: React.FC<FilterProps> = ({ navigation }) => {
    const handleNavigateBack = () => navigation.goBack();
    const handleApplyFilters = (newFilters: { course?: string; searchQuery?: string }) => {
      setFilters(newFilters);
      navigation.goBack();
    };

    return (
      <FilterScreen
        menuItems={menuItems}
        onNavigateBack={handleNavigateBack}
        onApplyFilters={handleApplyFilters}
      />
    );
  };

  // --- Updated AddDishScreen to use AddMenuScreen and update state ---
  const AddDishScreen: React.FC<AddDishProps> = ({ navigation }) => {
    const handleAddMenuItem = (newItem: MenuItem) => {
      setMenuItems(prevItems => [...prevItems, newItem]);
      navigation.goBack();
    };

    return <AddMenuScreen onAddMenuItem={handleAddMenuItem} navigation={navigation} />;
  };

  const headerOptions = {
    headerStyle: { backgroundColor: '#dc3545' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' as const },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: '🍽️ Restaurant Menu', ...headerOptions }}>
          {props => (
            <View style={appStyles.flexContainer}>
              <View style={appStyles.filterButtonContainer}>
                <Button
                  title={`Filter (${filters.course || 'All'}${filters.searchQuery ? ' + Search' : ''})`}
                  onPress={() => props.navigation.navigate('Filter')}
                  color="#007bff"
                />
              </View>

              <View style={homeStyles.container}>
                <View style={homeStyles.summaryBox}>
                  <Text style={homeStyles.summaryText}>Total Menu Items:</Text>
                  <Text style={homeStyles.totalText}>{filteredMenuItems.length}</Text>
                </View>

                <FlatList
                  data={filteredMenuItems}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('ItemDetails', { item })}
                      activeOpacity={0.7}
                    >
                      <View style={homeStyles.itemContainer}>
                        <View style={{ flex: 1 }}>
                          <Text style={homeStyles.dishName}>{item.dishName}</Text>
                          <Text style={[homeStyles.course, { color: getCourseColor(item.course) }]}>
                            {item.course}
                          </Text>
                          <Text style={homeStyles.description}>{item.description}</Text>
                        </View>
                        <Text style={homeStyles.price}>R{item.price.toFixed(2)}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={
                    filteredMenuItems.length === 0 ? homeStyles.emptyListContainer : undefined
                  }
                  ListEmptyComponent={
                    <Text style={homeStyles.emptyText}>No items match your filters.</Text>
                  }
                />

                <TouchableOpacity
                  style={homeStyles.addButton}
                  onPress={() => props.navigation.navigate('AddDish')}
                  activeOpacity={0.8}
                >
                  <Text style={homeStyles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ItemDetails"
          component={MenuItemScreen}
          options={({ route }) => ({ title: route.params.item.dishName, ...headerOptions })}
        />

        <Stack.Screen name="Filter" options={{ title: 'Filter Menu', ...headerOptions }}>
          {props => <WrappedFilterScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="AddDish"
          component={AddDishScreen}
          options={{ title: 'Add New Dish', ...headerOptions }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// =================================================================
//                 ✅ ADDED: STYLES FOR PLACEHOLDERS
// =================================================================
const filterStyles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f8f8f8',
  },
});
// =================================================================

// ✅ Strongly typed styles
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
    backgroundColor: '#dc3545',
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

const appStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  filterButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  placeholderSubText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
});

// Helper to get color for course type
const getCourseColor = (course: MenuItem['course']) => {
  switch (course) {
    case 'Appetizer':
      return '#ffc107';
    case 'Main Course':
      return '#dc3545';
    case 'Dessert':
      return '#007bff';
    case 'Beverage':
      return '#17a2b8';
    default:
      return '#6c757d';
  }
};

export default App;