import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar
} from 'react-native';
import {
  Ionicons
} from '@expo/vector-icons';
import {
  TabNavigator
} from 'react-navigation';
import DeckList from './component/DeckList';
import AddNewDeck from './component/AddNewDeck';
import reducer from './reducers/index';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import {
  Provider
} from 'react-redux';
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import {
  composeWithDevTools
} from 'remote-redux-devtools';
import { StackNavigator } from 'react-navigation';
import DeckDetail from './component/DeckDetail'
import AddQuestion from './component/AddQuestion'
import Quiz from './component/Quiz'
import {setLocalNotification} from './utils/notification'

const composeEnhancers = composeWithDevTools({
  realtime: true
});

let store = createStore(reducer,
  composeEnhancers(applyMiddleware(thunk))
)


export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store = {store} >
        <MainNavigator />
      </Provider>
    );
  }
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList
  },
  New: {
    screen: AddNewDeck
  },
});

const MainNavigator = StackNavigator({
  Home :{
    screen: Tabs
  },
  detail: {
    screen: DeckDetail
  },
  addQuestion: {
    screen: AddQuestion
  },
  quiz:{
    screen: Quiz
  }
})
