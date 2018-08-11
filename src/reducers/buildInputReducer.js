export default (actionType, inputName) => (state = '', action = {}) => {
  if (action.name !== inputName) {
    return state
  }
  console.log(action)
  switch (action.type) {
    case actionType:
      return action.value
    default:
      return state
  }
}
