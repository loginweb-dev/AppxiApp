//--------- REACT ------------------------------
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//-------------- NAVEGATION ----------------------------------
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//-------------------  Views ----------------------------------
import SplashScreen from './src/views/splashscreen';
import Login from './src/views/login';
import Register from './src/views/register';
import Home from './src/views/home';
import Profile from './src/views/profile';
import Maps from './src/views/maps';
import LocationCreate from "./src/views/crud/location_create";

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
          <Stack.Screen
            name="SplashScreen" component={SplashScreen}
            options={{
              title: '',
              headerTransparent: true,
            }}
          />
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="Home" component={Home} /> */}
          {/* <Stack.Screen name="Profile" component={Profile} /> */}
          {/* <Stack.Screen name="Maps" component={Maps} /> */}
          {/* <Stack.Screen name="LocationCreate" component={LocationCreate} /> */}
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="TabMenu" component={TabMenu}
            options={{
              title: '',
              headerTransparent: true,
            }}
            independent={true}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const Tab = createBottomTabNavigator();
function TabMenu() {
  return (
    <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#45A4C0',
          inactiveTintColor: 'gray',
        }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Hictorico',
          tabBarIcon: ({ color }) => (
            <Icon name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={Maps}
        options={{
          tabBarLabel: 'Servicios',
          tabBarIcon: ({ color }) => (
            <Icon name="car" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
export default App;