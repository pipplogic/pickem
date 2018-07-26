import { login } from "../api";

export const mapState = ({ login: { user, pass } }) => {
  return { user, pass };
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

    console.log("something", { user, pass });
  }
});
