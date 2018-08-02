import axios from "axios";
let bearer = null;

export function loadWeek(year, week) {
  const url = `/api/v1/games/season/${year}/week/${week}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    })
    .then(({ data: { games } }) => {
      if (!games) {
        throw new Error("Error loading week");
      }
      return games;
    })
    .catch(function() {
      console.warn("error", arguments);
    });
}

export function login(user, pass) {
  return axios
    .post("/login", { username: user, password: pass })
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error("Bad Password");
      }
      bearer = resp.data;
    })
    .catch(resp => {
      throw new Error("Unable to log in");
    });
}
