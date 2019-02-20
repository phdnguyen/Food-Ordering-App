import React, { Component } from 'react';
import {
  Text, StyleSheet, TextInput, Platform, TouchableOpacity,
  View, Image, Dimensions, KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase'

import {
  backgroundColor, primaryColorBrown, primaryColorRed,
  primaryColorGreen, commonStyles
} from '../styles'

class LoginScreen extends Component {
  state = {
    isSigningIn: false,
    inSigningUp: false
  }

  onPushDataToFirebase = (user) => {
    firebase.database().ref('/users').child(user.uid).set({
      displayName: '',
      phoneNumber: '',
      address: ''
    })
  }

  onSignUp = () => {
    this.setState({ inSigningUp: true })
    const email = this.state.email
    const password = this.state.password

    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({ inSigningUp: false })
        this.onPushDataToFirebase(res.user._user)
        this.props.navigation.navigate('HomeScreen')
      })
      .catch(err => this.setState({
        error: err.toString(),
        password: '',
        inSigningUp: false
      }))
  }

  onSignIn = () => {
    this.setState({ isSigningIn: true })
    const email = this.state.email
    const password = this.state.password

    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({ isSigningIn: false })
        this.props.navigation.navigate('HomeScreen')
      })
      .catch(err => this.setState({
        error: err.toString(),
        isSigningIn: false
      }))
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Image
          source={require('../../assets/imgs/logo_app.jpg')}
          style={{ width: '100%', height: Dimensions.get('window').width - 60 }}
          resizeMode='contain' />
        <View style={styles.row}>
          <Image
            style={styles.icon}
            source={require('../../assets/imgs/ic_email.png')} />
          <Text style={styles.title}>Email</Text>
        </View>
        <TextInput
          style={styles.inputField}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          autoCorrect={false}
          underlineColorAndroid='rgba(0,0,0,0)' />
        <View style={styles.row}>
          <Image
            style={styles.icon}
            source={require('../../assets/imgs/ic_password.png')} />
          <Text style={styles.title}>Password</Text>
        </View>
        <TextInput
          style={styles.inputField}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          autoCorrect={false}
          underlineColorAndroid='rgba(0,0,0,0)' />
        <Text style={styles.textError}>{this.state.error}</Text>
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <TouchableOpacity
            style={[commonStyles.button, { backgroundColor: primaryColorGreen }]}
            onPress={this.onSignUp}>
            {this.state.inSigningUp === true
              ? <ActivityIndicator size='small' color='white'/>
              : <Text style={{ color: 'white' }}>Sign Up</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[commonStyles.button, { backgroundColor: primaryColorRed }]}
            onPress={this.onSignIn}>
            {this.state.isSigningIn === true
              ? <ActivityIndicator size='small' color='white'/>
              : <Text style={{ color: 'white' }}>Sign In</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    justifyContent: 'center',
    padding: 30
  },
  row: {
    flexDirection: 'row',
    marginTop: 20
  },
  icon: {
    width: 20,
    height: 20
  },
  title: {
    marginLeft: 5,
    color: primaryColorBrown
  },
  inputField: {
    borderBottomWidth: 1,
    borderColor: primaryColorBrown,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
  },
  textError: {
    color: primaryColorRed,
    marginTop: 15
  }
})

export default LoginScreen;