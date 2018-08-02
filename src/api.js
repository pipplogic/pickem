import axios from "axios";
let authToken = null;

class BadAuthentication extends Error {
  constructor(msg) {
    super(msg);
    this.name = "BadAuth";
  }
}

export function loadToken() {
  authToken = window.localStorage.getItem("token");
  return authToken;
}

function setToken(token) {
  if (token) {
    authToken = `Bearer ${token}`;
    window.localStorage.setItem("token", authToken);
  } else {
    authToken = null;
    window.localStorage.removeItem("token");
  }
}

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      setToken(null);
      throw new BadAuthentication("User not authenticated");
      //place your reentry code
    }
    return error;
  }
);

export function loadWeek(year, week) {
  const url = `/api/v1/games/season/${year}/week/${week}`;

  return axios
    .get(url, {
      headers: {
        Authorization: authToken
      }
    })
    .then(({ data: { games } }) => {
      if (!games) {
        throw new Error("Error loading week");
      }
      return games;
    });
}

export function login(user, pass) {
  return axios
    .post("/login", { username: user, password: pass })
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error("Bad Password");
      }
      setToken(resp.data);
    })
    .catch(resp => {
      throw new Error("Unable to log in");
    });
}
