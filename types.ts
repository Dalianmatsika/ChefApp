export interface MenuItem {
  id: string;
  dishName: string;
  course: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage' | string;
  description: string;
  price: number;
  image?: string; 
}

// Navigation State Definition
interface RouteState {
    name: 'HomeScreen' | 'AddItem' | 'FilterScreen';
    params?: { item?: MenuItem }; 
}

// Message Box Interface
interface Message {
    id: number;
    title: string;
    body: string;
    type: 'success' | 'error';
}

// Sample Data (Initialized here for easy access)
const sampleMenuItems: MenuItem[] = [
    { 
        id: '1', dishName: 'Filet Mignon', course: 'Main Course', 
        description: 'A tender cut of beef served with mashed potatoes and vegetables.', price: 29.99
    },
    { 
        id: '2', dishName: 'Chicken Parmesan', course: 'Main Course', 
        description: 'Breaded chicken topped with marinara sauce and mozzarella.', price: 22.99
    },
    { 
        id: '3', dishName: 'Spring Rolls', course: 'Appetizer', 
        description: 'Crispy rolls filled with vegetables and served with sweet sauce.', price: 6.99
    },
    { 
        id: '4', dishName: 'Chocolate Lava Cake', course: 'Dessert', 
        description: 'A rich chocolate cake with a gooey, molten center.', price: 7.99
    },
    { 
        id: '5', dishName: 'Vanilla Bean Cheesecake', course: 'Dessert', 
        description: 'A smooth cheesecake topped with vanilla bean and a graham cracker crust.', price: 6.49
    },
    { 
        id: '6', dishName: 'Iced Latte', course: 'Beverage', 
        description: 'Cold espresso mixed with ice and topped with milk.', price: 4.50
    },
    { 
        id: '7', dishName: 'Fresh Lemonade', course: 'Beverage', 
        description: 'A refreshing, tangy lemonade made from fresh squeezed lemons.', price: 3.25
    },
];
