import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native'
import {AsyncStorage} from 'react-native'
import {connect} from 'react-redux';
import {getDecks} from '../actions/DeckActions';
import DeckItem from './DeckItem.js';


class DeckList extends Component {

  componentDidMount() {
    //AsyncStorage.clear()
    this.props.fetchDecks()
  }

  render() {
    let {decks} = this.props
    let keys = Object.keys(decks)
    return(
      <ScrollView>
        {!keys && keys.map(key =>
            <DeckItem  key={key} {...this.props} id={key}/>
        )}
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
})

function mapStateToProps({decks}) {
  return {decks}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDecks : () => dispatch(getDecks())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
