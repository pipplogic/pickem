export default (actionType, inputName) => (state = '', action = {}) => {
  if (action.name !== inputName) {
    return state
  }
  switch (action.type) {
    case actionType:
      return action.value
    default:
      return state
  }
}
