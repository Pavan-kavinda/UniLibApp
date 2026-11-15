// App.js 
import React from 'react';
import { Switch, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeProvider, useTheme } from './ThemeContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CatalogScreen from './screens/CatalogScreen';
import DetailScreen from './screens/DetailScreen';
import BorrowedScreen from './screens/BorrowedScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReviewScreen from './screens/ReviewScreen'; // Review Screen එක ඉම්පෝර්ට් කිරීම

const Stack = createStackNavigator();

function AppNavigator() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" // මුල්ම තිරය ලෙස Login සැකසීම
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? '#161b22' : '#1e3d59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ color: '#fff', marginRight: 8, fontSize: 12 }}>
                {isDarkMode ? '🌙 Dark' : '☀️ Light'}
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#10b981' }}
                thumbColor="#f4f3f4"
              />
            </View>
          ),
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'UniLib Portal' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'UniLib Dashboard', headerLeft: null }} />
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Book Catalog' }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Book Details' }} />
        <Stack.Screen name="Borrowed" component={BorrowedScreen} options={{ title: 'My Borrowed Books' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Library Profile & Hours' }} />
        <Stack.Screen name="Review" component={ReviewScreen} options={{ title: 'Write a Review' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}