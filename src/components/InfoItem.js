import React, { Component } from 'react';
import {
  Text,
  View, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'react-native-firebase'

import { primaryColorGreen, primaryColorBrown } from '../styles'

class InfoItem extends Component {
  state = {
    content: this.props.content
  }

  onPushUserDataToFirebase() {
    firebase.database().ref('/users')
      .child(firebase.auth().currentUser.uid)
      .child(this.props.type)
      .set(this.state.content)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ content: newProps.content })
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', marginVertical: 5 }}>
        <Icon name={this.props.iconName} size={25}
          color={primaryColorGreen} style={{ marginLeft: 7 }} />
        <TextInput
          style={{ flex: 1, color: primaryColorBrown, marginLeft: 16 }}
          defaultValue={this.state.content}
          placeholder='Enter your information'
          onSubmitEditing={(event) => this.setState({ content: event.nativeEvent.text },
            () => this.onPushUserDataToFirebase())}
        />
      </View>
    );
  }
}

export default InfoItem;