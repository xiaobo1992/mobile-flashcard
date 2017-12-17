import {ADD_QUESTION, SET_CURRENT_QUESTION } from "./type.js"
import * as API from '../utils/api.js'

export const addNewQuestion = (question) =>{
  return {
    type: ADD_QUESTION,
    question
  }
}

export const getCurrQuestion = (question) => {
  return {
    type: SET_CURRENT_QUESTION,
    question
  }
}


export const getQuestion = (qid) => dispatch => {
  API.getQuestion(qid).then(
    question => {
      question = JSON.parse(question)
      //console.log(question)
      dispatch(getCurrQuestion(question))
    }
  )
}
