import {AsyncStorage} from 'react-native'
import * as uuid from './uuid.js'
import {NOTIFICATION_KEY} from './notification'

export const fetchDecks = () => {
  return AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiGet(keys))
    .then(results => results.reduce((curr, obj)=> {
      const key = obj[0];
      const val = JSON.parse(obj[1])
      if (!val.parent_id && key !== NOTIFICATION_KEY) {
        curr[key] = val
      }
      return curr
    }, {}))
}

export const addDeck = (title) => {
    let key = uuid.guid();
    let deck = {
      id:key,
      title:title,
      questions:[],
    }
    AsyncStorage.setItem(key, JSON.stringify(deck));
    return key;
}

export const getDeck = (id) => {
  return AsyncStorage.getItem(id)
}

export const addQuestion = (deck_id, question, answer) => {
  let qid = uuid.guid();
  let card ={
    parent_id:deck_id,
    qid: qid,
    question: question,
    answer:answer
  }
  AsyncStorage.setItem(qid, JSON.stringify(card));
  AsyncStorage.getItem(deck_id)
  .then(deck => {
    deck = JSON.parse(deck)
    deck.questions.push(qid)
    AsyncStorage.setItem(deck_id, JSON.stringify(deck))
  })
  return AsyncStorage.getItem(qid)
}

export const getQuestion = (qid) => {
  return AsyncStorage.getItem(qid)
}
