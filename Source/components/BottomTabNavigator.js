import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlayScreen from '../screens/PlayScreen';
import CoursesScreen from '../screens/CoursesScreen';
import MeScreen from '../screens/MeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
 
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Play"
        component={PlayScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="golf" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="person-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}