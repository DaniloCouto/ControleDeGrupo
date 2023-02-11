import { createStore, combineReducers } from 'redux';
import channel from './ducks/channel'

const reducers = combineReducers({
  channel
})

const store = createStore(reducers);
  
export type RootState = ReturnType<typeof store.getState>

export default store;