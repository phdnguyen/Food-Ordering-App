import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import TabMenu from './TabMenu'
import TabHistory from './TabHistory'
import TabInfo from './TabInfo'
import TabOrder from './TabOrder';
import { primaryColorGreen } from '../styles'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import IconWithNoti from '../components/IconWithNoti';
const configure = configureStore()

const BottomNavigation = createBottomTabNavigator(
  {
    Menu: TabMenu,
    Order: TabOrder,
    History: TabHistory,
    Info: TabInfo
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Menu') {
          iconName = `cutlery`;
        } else if (routeName === 'Order') {
          iconName = `shopping-cart`;
        } else if (routeName === 'History') {
          iconName = `history`;
        } else if (routeName === 'Info') {
          iconName = `info-circle`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <IconWithNoti
          iconName={iconName}
          routeName={routeName}
          tintColor={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: primaryColorGreen,
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white'
      }
    },
  })

const SwitchNavigation = createSwitchNavigator({
  SplashScreen: SplashScreen,
  LoginScreen: LoginScreen,
  HomeScreen: BottomNavigation,
})

class App extends Component {
  state = {}
  render() {
    return (
      <Provider store={configure.store}>
        <PersistGate loading={null} persistor={configure.persistor}>
          <SwitchNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;