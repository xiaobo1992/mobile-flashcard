import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux';

class DeckItem extends Component {
  constructor(props){
  	super(props);
  }

  render() {
    const deck = this.props.decks[this.props.id]
    return(
      <TouchableOpacity onPress={
        () => this.props.navigation.navigate('detail', {deck_id:deck.id})
      }>
        <View style={styles.container}>
          <Text style={styles.text}>{deck.title}</Text>
          <Text style={styles.text}>{deck.questions.length}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    padding:30,
    borderRadius:10,
    backgroundColor:'white'
  },
  text:{
    fontSize: 25
  }
})

function mapStateToProps({decks}) {
  return{decks}
}

export default connect(mapStateToProps)(DeckItem)
