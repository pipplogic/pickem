export default (actionType, inputName, initial = '') => (
  state = initial,
  action = {}
) => {
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
