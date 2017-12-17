import {ADD_NEW_DECK, FETCH_DECKS, CURRENT_DECK,
  ADD_QUESTION_ID, GET_CURRENT_QUESTION} from "./type.js"
import * as API from '../utils/api.js'
import {AsyncStorage} from 'react-native'

export const addDeck = (deck) => {
  return {
    type: ADD_NEW_DECK,
    deck
  }
}

export const fetchDecks = (decks) => {
  return {
    type: FETCH_DECKS,
    decks
  }
}

export const currDeck = (deck) => {
  return {
    type: CURRENT_DECK,
    deck
  }
}

export const addQuestionId = (deck_id, qid) => {
  return {
    type: ADD_QUESTION_ID,
    deck_id,
    qid
  }
}

export const getDecks = () => dispatch =>{
  API.fetchDecks().then(decks => dispatch(fetchDecks(decks)))
}

export const getDeck = (id) => dispatch => {
  API.getDeck(id).then(deck => dispatch(currDeck(JSON.parse(deck))))
}

export const addNewDeck =  (title) => dispatch => {
  let id = API.addDeck(title)
  API.getDeck(id).then(deck => dispatch(addDeck(JSON.parse(deck))))
}

export const storeQuestion = (deck_id, question, answer) => dispatch => {

  API.addQuestion(deck_id, question, answer).then(
    question => {
      question = JSON.parse(question)
      dispatch(addQuestionId(question.parent_id, question.qid))
    }
  )
}
