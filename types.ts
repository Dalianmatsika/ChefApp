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
