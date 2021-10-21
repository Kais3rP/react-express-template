import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'

//PERSIST HISTORY
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

//REDUCERS
import authReducer from '../features/auth/auth.slice'

//RTK QUERY
import { authApi } from '../services'

//PERSIST

import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import localForage from 'localforage'
const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['router', [authApi.reducerPath], 'auth'],
}

//HISTORY

export const history = createBrowserHistory()
const HistoryReducer = connectRouter(history)

const rootReducer = combineReducers({
  router: HistoryReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
    .concat(authApi.middleware) //Middlewares are needed for revalidation, optimistic updates, etc...
    .concat(routerMiddleware(history)),
})

export const persistor = persistStore(store)
