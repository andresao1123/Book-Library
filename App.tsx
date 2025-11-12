import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LibraryStackParamList, RootTabParamList  } from './src/types';
import { BookListScreen } from './src/screens/BookListScreen';
import { BookDetailScreen } from './src/screens/BookDetailScreen';
import { BorrowedBooksScreen } from './src/screens/BorrowedBooksScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator<LibraryStackParamList >();
const Tab = createBottomTabNavigator<RootTabParamList>();

function BookStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="BookList" 
        component={BookListScreen}
        options={{ title: 'Library' }}
      />
      <Stack.Screen 
        name="BookDetail" 
        component={BookDetailScreen}
        options={{ title: 'Book Details' }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        headerShown: false,
      }}
    >
       <Tab.Screen
        name="LibraryTab"
        component={BookStackNavigator}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📚</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="BorrowedBooks" 
        component={BorrowedBooksScreen}
        options={{
          tabBarLabel: 'My Books',
          headerShown: true,
          headerTitle: 'My Borrowed Books',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📖</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}