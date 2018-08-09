import { loadToken } from "../api";
import { initializeToken } from "../reducers/login";

export const mapState = ({ login }) => ({
  loggedIn: login.status === "LOGGED_IN"
});

export const mapDispatch = dispatch => ({
  loadExistingSession: () => {
    const token = loadToken();
    dispatch(initializeToken(token));
  }
});
