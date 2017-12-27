import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Button, Animated } from 'react-native'
import {connect} from 'react-redux';
import {getQuestion} from '../actions/QuestionActions'
import {QUESTION_MODE, ANS_MODE, FINISH_MODE} from './string'
import {clearLocalNotification, setLocalNotification} from '../utils/notification'
class Quiz extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      correct : 0,
      wrong: 0,
      curr : 0,
      questions:[],
      curr_qid:"",
      finished:false,
      isQuestion:true
    };
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)

    this.setState({questions: this.props.navigation.state.params.questions}, function(){
        this.getQuestion()
    })
  }

  componentWillMount() {
    this.init()
  }

  flipCard = () => {

    this.setState({isQuestion: !this.state.isQuestion})
    if (this.value > 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
      }).start()
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
      }).start()
    }
  }

  init() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate(
      {
        inputRange:[0, 180],
        outputRange:['0deg','180deg']
      }
    )

    this.backInterpolate = this.animatedValue.interpolate(
      {
        inputRange:[0, 180],
        outputRange:['180deg','360deg']
      }
    )
  }

  submit = (correct) => {
    this.init()
    if (correct) {
      this.setState({correct:this.state.correct + 1})
    } else {
      this.setState({wrong:this.state.wrong + 1})
    }
    this.setState({curr: this.state.curr + 1, isQuestion: true}, function() {
      if (this.state.curr < this.state.questions.length) {
        this.getQuestion()
      } else {
        this.setState({finished : true})
      }
    })
  }

  getQuestion = () => {
    this.setState({curr_qid: this.state.questions[this.state.curr]}, function() {
        this.props.getQuestion(this.state.curr_qid)
    })
  }

  restart = () => {
    this.setState({
      finished: false,
      curr: 0,
      correct : 0,
      wrong : 0,
      isQuestion: true
    }, function() {
      this.getQuestion()
    })
  }

  finish =() => {
    this.props.navigation.goBack()
  }

  render() {
    const frontAnimatedStyle = {
     transform: [
       { rotateY: this.frontInterpolate}
     ]
   }
   const backAnimatedStyle = {
     transform: [
       { rotateY: this.backInterpolate }
     ]
   }

    let {currentQuestion} = this.props.questions
    return(
      <View style={styles.container}>
        {currentQuestion && !this.state.finished &&
          <View style={styles.container}>
            <Text style={styles.status}>{this.state.curr + 1}/{this.state.questions.length}</Text>
            {this.state.isQuestion && <Animated.View style={[styles.flipcard, frontAnimatedStyle]}>
              <Text style={styles.question}>{currentQuestion.question}</Text>
            </Animated.View>}
            {!this.state.isQuestion && <Animated.View style={[styles.flipcard, backAnimatedStyle]}>
              <Text style={styles.answer}>{currentQuestion.answer}</Text>
            </Animated.View>}

            <TouchableOpacity>
              {this.state.isQuestion &&
                <Text style={styles.text} onPress={this.flipCard}>Answer</Text>
              }
              {!this.state.isQuestion &&
                <Text style={styles.text} onPress={this.flipCard}>Question</Text>
              }
            </TouchableOpacity>
            <View style={styles.btn_group}>
              <TouchableOpacity onPress={()=>this.submit(true)}>
                <Text style={styles.correct_btn}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.submit(false)}>
                <Text style={styles.incorrect_btn}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        {this.state.finished &&
          <View style={styles.container}>
            <Text style={styles.text}>Correct: {this.state.correct}</Text>
            <Text style={styles.text}>Incorrect: {this.state.wrong}</Text>
            <Text style={styles.text}>Score: {this.state.correct / (this.state.correct + this.state.wrong) * 100}</Text>
            <TouchableOpacity onPress={this.finish}>
              <Text style={styles.finsh_btn}>Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.restart}>
              <Text style={styles.restart_btn}>Restart</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

function mapStateToProps({questions}) {
  return{questions}
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestion: (id) => dispatch(getQuestion(id))
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  },
  text:{
    fontSize:25,
    padding: 5
  },
  board: {
    padding: 5,
    height:100,
    width:200,
    borderWidth:2,
    backgroundColor:'white'
  },
  flipcard:{
    width: '80%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:2
  },
  question:{
    fontSize: 30,
    textAlign:'center',
  },
  answer:{
    fontSize: 30,
    textAlign:'center',
  },
  btn_group: {
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:"2%",
    padding:5,
    width:'50%',
  },
  correct_btn: {
    marginTop:"2%",
    backgroundColor:"green",
    fontSize:15,
    padding:10,
    color:'white'
  },
  incorrect_btn: {
    marginTop:"2%",
    backgroundColor:"red",
    fontSize:15,
    padding:10,
    color:'white'
  },
  ans_btn: {
    marginTop:"2%",
    fontSize: 10,
    padding:10,
    color:'white',
    backgroundColor:'black'
  },
  restart_btn: {
    marginTop:"2%",
    backgroundColor:"blue",
    fontSize:15,
    padding:10,
    color:'white',
  },
  finsh_btn: {
    marginTop:"2%",
    backgroundColor:"green",
    fontSize:15,
    padding:10,
    color:'white',
  },
  status:{
    fontSize:15
  }

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)
