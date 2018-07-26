export default (
  state = { user: "", pass: "", status: "NOT_LOGGED_IN" },
  action = {}
) => {
  switch (action.type) {
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
        status: "SUCCESS"
      };
    }
    case "LOGIN_FAIL": {
      return {
        ...state,
        status: "FAIL"
      };
    }

    default: {
      return state;
    }
  }
};
