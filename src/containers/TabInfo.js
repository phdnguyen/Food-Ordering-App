import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import firebase from 'react-native-firebase'

import { commonStyles } from '../styles'
import InfoItem from '../components/InfoItem';

class TabInfo extends Component {
  state = {  }

  componentDidMount() {
    firebase.database().ref('/users')
      .child(firebase.auth().currentUser.uid)
      .once('value', res => this.setState({
        address: res._value.address,
        displayName: res._value.displayName,
        phoneNumber: res._value.phoneNumber
      }))
  }

  render() {
    console.log(this.state.address)
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.fontTitleScreen}>Information</Text>
        <InfoItem iconName='location-arrow' content={this.state.address} type='address'/>
        <InfoItem iconName='user' content={this.state.displayName} type='displayName'/>
        <InfoItem iconName='phone' content={this.state.phoneNumber} type='phoneNumber'/>
      </View>
    );
  }
}

export default TabInfo;