import { combineReducers } from "redux";

import login from "./login";
import picks from "./picks";
import teams from "./teams";
import week from "./week";

export default combineReducers({
  login,
  picks,
  week,
  teams
});
