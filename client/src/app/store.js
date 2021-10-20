import { configureStore } from '@reduxjs/toolkit'
import testReducer from '../features/test/test.slice'
import { testApi } from '../services'

export const store = configureStore({
  reducer: {
    count: testReducer,
    [testApi.reducerPath]: testApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware),
})
