import { createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
  name: 'test',
  initialState: {
    count: 0,
  },
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    incrementByAmount(state, action) {
      state.count += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = testSlice.actions
export default testSlice.reducer
