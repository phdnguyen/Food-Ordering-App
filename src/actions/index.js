import { ADD_ORDER, DEL_ORDER, CLEAR_ORDER } from './type'

export const addOrder = (order) => ({
  type: ADD_ORDER,
  //key, dish, unitPrice, amount
  payload: order
})

export const delOrder = (key) => ({
  type: DEL_ORDER,
  payload: key
})

export const clearOrder = () => ({
  type: CLEAR_ORDER
})