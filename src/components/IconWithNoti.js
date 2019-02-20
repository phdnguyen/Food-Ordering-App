import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import { primaryColorRed } from '../styles'

class IconWithNoti extends Component {
  state = {}

  render() {
    const totalAmount = (this.props.orders.length === 0)
      ? 0
      : this.props.orders.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount, 0)

    return (
      <View>
        <Icon name={this.props.iconName} size={25} color={this.props.tintColor} />
        {this.props.routeName === 'Order' && totalAmount !== 0 &&
          <View style={{
            position: 'absolute',
            left: 15,
            backgroundColor: primaryColorRed,
            width: 20,
            height: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 12 }}>{totalAmount}</Text>
          </View>
        }
      </View>
    );
  }
}
const mapStateToProps = ({ orders }) => ({ orders })

export default connect(mapStateToProps)(IconWithNoti);