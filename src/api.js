const API_HOST = process.env.REACT_APP_API_HOST;
const SELF = process.env.REACT_APP_SLEF || "http://localhost:3002";

let bearer = "idiot";

export function loadWeek(year, week) {
  const url = `${API_HOST}/api/v1/games/season/${year}/week/${week}`;
  console.log("bearer", bearer);
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(res => res.json())
    .then(result => {
      if (!result.games) {
        throw result;
      }
      return result.games;
    });
}

export function login(user, pass) {
  return fetch(`${SELF}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ username: user, password: pass })
  })
    .then(resp => {
      if (resp.status !== 200) {
        throw "Bad Password";
      }
      return resp.text().then(newBearer => {
        bearer = newBearer;
        console.log("new bearer", bearer);
        return;
      });
    })
    .catch(resp => {
      throw "Unable to log in";
    });
}
