import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { reducer as form } from 'redux-form'
import promiseMiddleware from 'redux-promise-middleware'
import myReducer from './reducer'

const rootReducer = combineReducers({form, myReducer})
export default compose(applyMiddleware(promiseMiddleware()))(createStore)(rootReducer)
