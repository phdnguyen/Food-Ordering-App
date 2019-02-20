import { ADD_ORDER, DEL_ORDER, CLEAR_ORDER } from '../actions/type'

export default function (state = [], action) {
  switch (action.type) {
    case ADD_ORDER:
      const ordersByKey = state.filter(order => order.key === action.payload.key)
      if (ordersByKey.length === 0) {
        return [...state,
        {
          key: action.payload.key,
          dish: action.payload.name,
          unitPrice: action.payload.price,
          amount: 1
        }]
      } else {
        return state.map(order => order.key === action.payload.key
          ? {
            ...order,
            amount: order.amount + 1
          }
          : order)
      }

    case DEL_ORDER:
      return state.filter(order => order.key !== action.payload)

    case CLEAR_ORDER:
      return []

    default:
      return state
  }
}