import React, {useContext} from 'react';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
// import { NativeBaseConfigProvider } from 'native-base/lib/typescript/core/NativeBaseContext';
import { NativeBaseProvider, extendTheme } from "native-base";

function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {userToken !== null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const newColorTheme = {
  brand: {
    900: "#5B8DF6",
    800: "#ffffff",
    700: "#cccccc",
  },
};

const theme = extendTheme({
  colors: newColorTheme,
});

export default AppNav;