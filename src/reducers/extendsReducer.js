export default actionName => (state = {}, action = {}) => {
  switch (action.type) {
    case actionName:
      switch (action.strategy) {
        case 'replace':
          return action.payload
        case 'defaults':
          return { ...action.payload, ...state }
        default:
          return { ...state, ...action.payload }
      }
    default:
      return state
  }
}
