
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/HomeScreen';
import CatalogScreen from './screens/CatalogScreen';
import DetailScreen from './screens/DetailScreen';
import BorrowedScreen from './screens/BorrowedScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1e3d59' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'UniLib Dashboard' }} />
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Book Catalog' }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Book Details' }} />
        <Stack.Screen name="Borrowed" component={BorrowedScreen} options={{ title: 'My Borrowed Books' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Library Info & Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}