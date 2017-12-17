import React, {Component} from 'react'
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import {getDeck} from '../actions/DeckActions'

class DeckDetail extends Component {

    componentDidMount() {
    }

    render() {
      const deck_id = this.props.navigation.state.params.deck_id;
      const curr = this.props.decks[deck_id]
      return (
        <View style={styles.container}>
          { curr &&
            <View style={styles.container}>
              <Text style={styles.title}>{curr.title}</Text>
              <Text style={styles.subtitle}>{curr.questions.length} cards</Text>
              <TouchableOpacity style={styles.btn}
              onPress={()=>this.props.navigation.navigate('addQuestion',
              {deck_id: curr.id})}>
              <Text style={[styles.btn, styles.add]}>Add Question</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
                onPress={() => {
                  if (curr.questions.length > 0) {
                    this.props.navigation.navigate('quiz',{questions: curr.questions})
                  }
                }
              }>
                <Text style={[styles.btn, styles.quiz]}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          }
          {!curr &&
            <Text>Loading</Text>
          }
        </View>
      )

    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10
  },
  title:{
    fontSize: 40,
  },
  subtitle:{
    fontSize: 30
  },
  btn:{
    marginTop:"2%",
    justifyContent:'center',
    padding:5,
    borderRadius:100
  },
  add:{
    backgroundColor:'red',
    color:'white',
    fontSize: 25
  },
  quiz:{
    backgroundColor:'blue',
    color:'white',
    fontSize: 25
  },
})


function mapStateToProps({decks}) {
  return {decks}
}

function mapDispatchToProps(dispatch) {
  return{
    getDeck: (id) => dispatch(getDeck(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail)
