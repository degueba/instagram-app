import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Feed from './src/components/Feed';
import Login from './src/pages/Login';

const RootStack = createStackNavigator(
  {
    Home: Feed,
    Login: Login
  },
  {
    initialRouteName: 'Login'
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}

