import React, { Component } from 'react';
import {
  Text, FlatList, TouchableWithoutFeedback,
  View,
} from 'react-native';
import firebase from 'react-native-firebase'

import DishItem from '../components/DishItem';
import { commonStyles, primaryColorRed, primaryColorGreen } from '../styles'

class TabMenu extends Component {
  state = {
    currentCategory: 'Hamburger',
    dishes: []
  }

  componentDidMount() {
    this.loadDishesByCategory();
  }

  loadDishesByCategory = () => {
    firebase.database().ref(`dishes/${this.state.currentCategory}`)
      .on('value', res => this.setState({ dishes: res._value }))
  }

  onChooseCategory = (item) => {
    this.setState({ currentCategory: item }, () => this.loadDishesByCategory())
  }

  renderCategory = ({ item }) => < TouchableWithoutFeedback
    onPress={() => this.onChooseCategory(item)} >
    <View>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 7,
        marginVertical: 10,
        color: this.state.currentCategory === item ? primaryColorRed : primaryColorGreen
      }}>{item}</Text>
    </View>
  </TouchableWithoutFeedback >

  renderDish = ({ item }) => <DishItem dish={item} />

  render() {
    return (
      <View style={commonStyles.container}>
        <FlatList
          data={['Hamburger', 'Pizza', 'Spaghetti', 'Salad', 'Drink', 'Snack']}
          keyExtractor={(index) => index.toString()}
          renderItem={this.renderCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }} />
        <FlatList
          data={this.state.dishes}
          keyExtractor={(item) => item.key}
          renderItem={this.renderDish}
          numColumns={2}
          showsVerticalScrollIndicator={false} />
      </View>
    );
  }
}

export default TabMenu;