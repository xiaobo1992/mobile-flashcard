import React,{Component} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Platform, TextInput,  TouchableOpacity} from 'react-native';
import {addNewDeck} from '../actions/DeckActions'

class AddNewDeck extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      title:"",
      error:"",
      result:""
    };
  }
  changeText = (text) => {
    this.setState({title:text})
  }

  submit = () => {
    if (!this.validate()) {
      return;
    }
    let id = this.props.addDeck(this.state.title)
    this.setState({title : ""})
    this.props.navigation.navigate('detail', {deck_id: id})
  }

  validate =() => {
    let pass = true;
    this.setState({
      error : "",
      result : "",
    })

    if (!this.state.title || this.state.title === '') {
      console.log("error")
      pass = false;
      this.setState({error:"No Empty Input"})
    } else {
      this.setState({result: `${this.state.title}` + " submitted"})
    }

    return pass;
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput style={styles.input} value={this.state.title}
          onChangeText={text => this.changeText(text)} placeholder={"New Title"} />
        <Text style={styles.error}>{this.state.error}</Text>
        <TouchableOpacity style={styles.button} onPress={this.submit}>
          <Text style={styles.text}>Submit</Text>
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
  button: {
    marginTop:"2%",
    justifyContent:'center',
    backgroundColor: '#DDDDDD',
    width:'40%',
    padding:5
  },
  text: {
    fontSize: 25,
    textAlign: "center"
  },
  error: {
    fontSize:15,
    marginTop:5,
    textAlign:"center",
    color:"red"
  }
})

function mapStateToProps({decks}) {
  return{decks}
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (title) => dispatch(addNewDeck(title))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewDeck);
