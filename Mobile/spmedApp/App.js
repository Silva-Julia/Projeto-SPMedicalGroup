import 'react-native-gesture-handler';

import React from 'react';
// import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Login from '../spmedApp/src/screens/login';
// import Main from './src/screens/main';
// import ConsultaPaciente from '../spmedApp/src/screens/consultaPaciente';

export default function Stack() {
  return (
    <NavigationContainer>      

      <AuthStack.Navigator
        // headerMode = 'none'
        initialRouteName="Login"
        screenOptions={{
        headerShown: false,
        }}>
        <AuthStack.Screen name='Login' component={Login} />
        {/* <AuthStack.Screen name="Main" component={Main} /> */}
        {/* <AuthStack.Screen name='ConsultaPaciente' component={ConsultaPaciente} /> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
