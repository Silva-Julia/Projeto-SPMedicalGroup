import 'react-native-gesture-handler';

import React from 'react';
// import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Login from '../spmedApp/src/screens/login';
import ConsultaPaciente from '../spmedApp/src/screens/consultaPaciente';
// import ConsultaMedico from './src/screens/consultaMedico';

export default function Stack() {
  return (
    <NavigationContainer>      

      <AuthStack.Navigator
        // headerMode = 'none'
        initialRouteName="login"
        screenOptions={{
        headerShown: false,
        }}>
        <AuthStack.Screen name='Login' component={Login} />
        <AuthStack.Screen name='ConsultaPaciente' component={ConsultaPaciente} />
        {/* <AuthStack.Screen name='ConsultaMedico' component={ConsultaMedico} /> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
