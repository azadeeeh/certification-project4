import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './reduxStore/store.js'


/**
 * Necessary for adding redux toolkit
 */
//import { configureStore } from '@reduxjs/toolkit'
//import { Provider } from 'react-redux'

/**
 * Importing reducers
 */
//import testReducer from './reducers/testReducer.js'

/**
 * Creating the store w/reducers

const store = configureStore({
  reducer: {
    test: testReducer
  }
})
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
