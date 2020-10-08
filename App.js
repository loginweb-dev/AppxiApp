//--------- REACT ------------------------------
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

//-------------- NAVEGATION ----------------------------------
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//-------------------  Views ----------------------------------
import Login from './src/views/login';
import Home from './src/views/home';
import Profile from './src/views/profile';

//----- REDUX -------------------
import { Provider } from 'react-redux';
import store from './store';

//--------------   Variables -----------------------------------
const Stack = createStackNavigator();

function App(){
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0B2647',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;