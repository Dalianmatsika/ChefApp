// MenuItemScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';

interface MenuItemScreenProps {
    route: any;
    navigation: any;
}

const MenuItemScreen: React.FC<MenuItemScreenProps> = ({ route, navigation }) => {
    const { item } = route.params;  // Access item passed from HomeScreen

    return (
        <ScrollView style={styles.container}>
        
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.detailsContainer}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text style={styles.course}>{item.course}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>R{item.price.toFixed(2)}</Text>

                {/* Optional: Add a button to go back to Home screen */}
                <Button
                    title="Back to Menu"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    itemImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dishName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    course: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginTop: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
        marginTop: 10,
    },
});

export default MenuItemScreen;