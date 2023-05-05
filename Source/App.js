import React from 'react'

import AppNav from './navigation/AppNav';
import { AuthProvider } from './context/AuthContext';

// const Stack = createStackNavigator();

export default function App() {
    return (
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    )
} 