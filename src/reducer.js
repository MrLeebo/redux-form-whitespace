export function save(payload) {
  return { type: 'SAVE', payload }
}

const initialState = {
  one: 'one',
  two: 'two',
  three: 'three'
}

export default function myReducer(state=initialState, action) {
  switch (action.type) {
    case 'SAVE_FULFILLED': {
      const { one = '', two = '', three = '' } = action.payload
      return {
        one: one.trim(),
        two: two.trim(),
        three: three.trim()
      }
    }
    default:
      return state
  }
}
