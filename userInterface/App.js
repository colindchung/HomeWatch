import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import ActionBarImage from './src/components/ActionBarImage';
import * as Font from 'expo-font';

// Font.loadAsync({
//   'Montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
// });

const navigator = createStackNavigator(
  {
    LoginPage: Login,
    HomePage: Home
  },
  {
    initialRouteName: 'LoginPage',
    defaultNavigationOptions: {
      title: 'Home Watch',
      headerLeft: <ActionBarImage />,
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1,
        // fontFamily: 'Montserrat-bold'
        // font-family: 'Roboto', sans-serif;
    },
    }
  }
);

export default createAppContainer(navigator);
