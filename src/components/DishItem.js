import React, { Component } from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
  View, Image
} from 'react-native';
import { connect } from 'react-redux'

import { primaryColorBrown, commonStyles, primaryColorRed } from '../styles'
import { addOrder } from '../actions'

class DishItem extends Component {
  state = {}

  addToCart = () => {
    this.props.addOrder(this.props.dish)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.props.dish.image }} />
        <Text style={styles.name} numberOfLines={1}>{this.props.dish.name}</Text>
        <Text style={styles.price}>{`${this.props.dish.price}$`}</Text>
        <TouchableOpacity
          style={[commonStyles.button, { backgroundColor: primaryColorRed, marginTop: 10 }]}
          onPress={this.addToCart}>
          <Text style={{ color: 'white' }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginVertical: 15,
    padding: 5,
    alignItems: 'center'
  },
  image: {
    height: 150, //1 inch ~ 160dp
    width: 150,
    borderRadius: 75
  },
  name: {
    marginTop: 5,
    color: primaryColorBrown,
    fontSize: 16,
    textAlign: 'center'
  },
  price: {
    marginTop: 5,
    color: primaryColorBrown,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default connect(null, { addOrder })(DishItem);