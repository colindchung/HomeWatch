import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const navigator = createStackNavigator(
  {
    Home: Login,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
