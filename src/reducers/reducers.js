import { combineReducers } from "redux";

import picks from "./picks";
import teams from "./teams";
import week from "./week";

export default combineReducers({
  picks,
  week,
  teams
});
