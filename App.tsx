import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import LeitorHomeScreen from './src/screens/LeitorHomeScreen';
import AutorScreen from './src/screens/AutorScreen';
import AdminScreen from './src/screens/AdminScreen';
import DetalheNoticiaScreen from './src/screens/DetalheNoticiaScreen';

export type RootStackParamList = {
  Login: undefined;
  Leitor: undefined;
  Autor: undefined;
  Admin: undefined;
  DetalheNoticia: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Leitor" component={LeitorHomeScreen} />
        <Stack.Screen name="Autor" component={AutorScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}