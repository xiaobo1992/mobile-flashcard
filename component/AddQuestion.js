import React,{Component} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Button} from 'react-native';
import {storeQuestion} from '../actions/DeckActions'

class AddQuestion extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      question :"",
      answer :"",
      questionError :"",
      answerError :"",
      result :"",
    };
  }

  submit = () => {
    if (!this.validate()) {
      return;
    }
    const deck_id = this.props.navigation.state.params.deck_id;
    this.props.addQuestion(deck_id, this.state.question, this.state.answer)
    this.setState({
      question : "",
      answer : "",
      result : "Submitted"
    })
  }

  validate =() => {
    let pass = true;
    this.setState({
      questionError : "",
      answerError : "",
      result : ""
    })

    if (!this.state.question || this.state.question  === '') {
      pass = false;
      this.setState({questionError:"No Empty Input"})
    }

    if (!this.state.answer || this.state.answer  === '') {
      pass = false;
      this.setState({answerError:"No Empty Input"})
    }

    return pass;
  }

  changeText = (key, value) => {
    this.setState({[key]:value})
  }

  render() {
    console.log(this.props)
    return(
      <View style={styles.container}>
        <TextInput style={styles.input} value={this.state.question}
          onChangeText={text => this.changeText("question", text)}
          placeholder={"Question"} />
        <Text style={styles.error}>{this.state.questionError}</Text>
        <TextInput style={styles.input} value={this.state.answer}
          onChangeText={text => this.changeText("answer", text)}
          placeholder="Answer"/>
        <Text style={styles.error}>{this.state.answerError}</Text>
        <TouchableOpacity onPress={this.submit}>
          <Text style={styles.submit_btn}>Submit Question</Text>
        </TouchableOpacity>
        <Text>{this.state.result}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    textAlign:'center',
    width:'80%',
    fontSize:35
  },
  error: {
    fontSize:15,
    marginTop:5,
    textAlign:"center",
    color:"red"
  },
  submit_btn: {
    marginTop:"2%",
    backgroundColor:"blue",
    fontSize:15,
    padding:10,
    color:'white'
  }
})

function mapStateToProps({decks}) {
  return{decks}
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (deck_id, q, a) => dispatch(storeQuestion(deck_id, q, a))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestion);
