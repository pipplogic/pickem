import { login } from "../api";

export const mapState = ({ login: { user, pass, status } }) => {
  const loading = status === "PROCESSING";
  const error = status === "ERROR";
  return { user, pass, loading, error };
};

export const mapDispatch = dispatch => ({
  userChange: ev => {
    const user = ev.target.value;

    dispatch({
      type: "LOGIN_USER",
      user
    });
  },
  passChange: ev => {
    const pass = ev.target.value;

    dispatch({
      type: "LOGIN_PASS",
      pass
    });
  },
  loginAction: (user, pass) => ev => {
    ev.preventDefault();
    dispatch({
      type: "LOGIN_SUBMIT"
    });
    login(user, pass)
      .then(() => {
        dispatch({
          type: "LOGIN_SUCCESS"
        });
      })
      .catch(() => {
        dispatch({
          type: "LOGIN_FAIL"
        });
      });
  }
});
