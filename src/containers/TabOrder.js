import React, { Component } from 'react';
import {
  Text, TouchableOpacity,
  View, FlatList
} from 'react-native';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

import { commonStyles, primaryColorBrown, primaryColorRed } from '../styles'
import OrderItem from '../components/OrderItem';
import { clearOrder } from '../actions'

class TabOrder extends Component {
  renderItem = ({ item }) => <OrderItem item={item} />

  confirmOrder = () => {
    if (this.props.orders.length === 0) return;

    const dbRef = firebase.database().ref('/users')
      .child(firebase.auth().currentUser.uid)
      .child('history')

    //1. get array history from firebase
    dbRef.once('value', res => {
      //2. add order to array
      const currentTime = new Date().toString()
      const currentOrder = {
        onGoing: true,
        orders: this.props.orders,
        date: currentTime.substring(0, currentTime.indexOf('GMT'))
      }

      //3. push array to firebase
      res._value !== null
        ? dbRef.set([...res._value, currentOrder]).then(this.confirmSuccessful)
        : dbRef.set([currentOrder]).then(this.confirmSuccessful)
    })
  }

  confirmSuccessful = () => {
    this.props.clearOrder()
    this.props.navigation.navigate('History')
  }

  render() {
    const totalPrice = (this.props.orders.length === 0)
      ? 0
      : this.props.orders.reduce(
        (accumulator, currentValue) => accumulator + currentValue.unitPrice * currentValue.amount, 0
      )

    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.fontTitleScreen}>Order</Text>
        <FlatList
          style={{ flexGrow: 0 }}
          data={this.props.orders}
          keyExtractor={(item) => item.key.toString()}
          renderItem={this.renderItem} />
        <View style={{
          marginHorizontal: 7,
          borderColor: primaryColorBrown,
          borderBottomWidth: 1,
          marginVertical: 16
        }} />
        <View style={{ flexDirection: 'row', marginHorizontal: 7 }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: primaryColorRed,
            flex: 1
          }}>Total</Text>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: primaryColorRed
          }}>{`${totalPrice}$`}</Text>
        </View>
        <TouchableOpacity
          style={[commonStyles.button, {
            backgroundColor: this.props.orders.length !== 0
              ? primaryColorRed : 'gray',
            position: 'absolute', bottom: 16, alignSelf: 'center'
          }]}
          onPress={this.confirmOrder}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ orders }) => ({ orders })

export default connect(mapStateToProps, { clearOrder })(TabOrder);
// export default connect(state, action)(TabOrder);