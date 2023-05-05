import React from 'react'
import BottomTabNavigator from '../components/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import ShowCourseScreen from '../screens/ShowCourseScreen';
import CoursesScreen from '../screens/CoursesScreen';
import HomeScreen from '../screens/HomeScreen';
import MeScreen from '../screens/MeScreen';
import PlayScreen from '../screens/PlayScreen';
import HoleScreen from '../screens/HoleScreen';
import PlayCard from '../components/PlayCard';
import LoginForm from '../components/LoginForm';
import StatsScreen from '../screens/StatsScreen';
import SingleStatScreen from '../screens/SingleStatScreen';
import FavouriteCoursesScreen from '../screens/FavouriteCoursesScreen';
import PreviousRoundsScreen from '../screens/PreviousRoundsScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CoursesScreen" component={CoursesScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MeScreen" component={MeScreen} />
      <Stack.Screen name="PlayScreen" component={PlayScreen} />
      <Stack.Screen name="ShowCourseScreen" component={ShowCourseScreen} />
      <Stack.Screen name="HoleScreen" component={HoleScreen} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="StatsScreen" component={StatsScreen} />
      <Stack.Screen name="FavouriteCoursesScreen" component={FavouriteCoursesScreen} />
      <Stack.Screen name="PreviousRoundsScreen" component={PreviousRoundsScreen} />
      <Stack.Screen name="SingleStatScreen" component={SingleStatScreen} />
    </Stack.Navigator>
  );
}