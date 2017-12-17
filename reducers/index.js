import {combineReducers} from 'redux';
import {ADD_NEW_DECK, FETCH_DECKS, CURRENT_DECK,
  ADD_QUESTION_ID, ADD_QUESTION,
  GET_CURRENT_QUESTION,
  SET_CURRENT_QUESTION} from '../actions/type.js'

const reducers = combineReducers({
  decks: deckReducer,
  questions: questionReducer
})

function deckReducer(state={}, action) {
  //console.log(action)
  switch(action.type) {
    case ADD_NEW_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck
      }
    case FETCH_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case CURRENT_DECK:
      return {
        ...state,
        currentDeck: action.deck
      }
    case ADD_QUESTION_ID:
      return {
        ...state,
        [action.deck_id]:{
          ...state[action.deck_id],
          questions: state[action.deck_id].questions.concat(action.qid),
        }
      }
    default:
      return state
  }
}

function questionReducer(state={}, action) {
  switch(action.type) {
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.question
      }
    default:
      return state
  }
}

export default reducers
