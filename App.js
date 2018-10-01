import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Feed from './src/components/Feed';
import Login from './src/pages/Login';



export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    }
  }

  _loadInitialState = async () => {
    try {
      let token = AsyncStorage.getItem('token')
        .then((token) => {
          if(token) {
            this.setState({logged: true}) 
          }    
        })
    } catch(e) {
      console.error(e)
    }
  }

  componentWillMount() {
    this._loadInitialState().done();
  }

  render() {
    var initialRoute;

    if(this.state.logged) {
      initialRoute = 'Home'
    } else {
      initialRoute = 'Login'
    }

    let RootStack = createStackNavigator(
      {
        Home: Feed,
        Login: Login
      },
      {
        initialRouteName: initialRoute,
        headerMode: 'none',
        cardStyle: { backgroundColor: '#ffffff' }
      },
    )


    return <RootStack />
  }
}

