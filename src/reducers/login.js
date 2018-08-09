export const initializeToken = token => {
  if (token) {
    return { type: "LOGGED_IN" };
  }

  return { type: "NOT_LOGGED_IN" };
};

export default (
  state = { user: "", pass: "", status: "UNINITIALIZED" },
  action = {}
) => {
  switch (action.type) {
    case "LOGGED_IN": {
      return { ...state, status: "LOGGED_IN" };
    }
    case "NOT_LOGGED_IN": {
      return { ...state, status: "NOT_LOGGED_IN" };
    }
    case "LOGIN_USER": {
      return {
        ...state,
        status: "NOT_LOGGED_IN",
        user: action.user
      };
    }
    case "LOGIN_PASS": {
      return {
        ...state,
        status: "NOT_LOGGED_IN",
        pass: action.pass
      };
    }
    case "LOGIN_SUBMIT": {
      return {
        ...state,
        status: "PROCESSING"
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        pass: "",
        status: "LOGGED_IN"
      };
    }
    case "LOGIN_FAIL": {
      return {
        ...state,
        pass: "",
        status: "ERROR"
      };
    }

    default: {
      return state;
    }
  }
};
