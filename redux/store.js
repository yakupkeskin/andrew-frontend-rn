//We create our store in here.
//We import this store in components when we want to reach our redux variables.
import { createStore } from 'redux'
import rootReducer from './reducers/counter'

const store = createStore(rootReducer)

export default store