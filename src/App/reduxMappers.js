import { loadToken } from "../api";
import { initializeToken } from "../reducers/login";

export const mapState = ({ login }) => {
  return { loggedIn: login.status === "LOGGED_IN" };
};

export const mapDispatch = (dispatch, { gameId, gameIds }) => ({
  loadExistingSession: () => {
    const token = loadToken();
    dispatch(initializeToken(token));
  }
});
