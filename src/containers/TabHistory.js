import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { commonStyles } from '../styles'

class TabHistory extends Component {
  state = {  }
  render() {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.fontTitleScreen}>History</Text>
      </View>
    );
  }
}

export default TabHistory;