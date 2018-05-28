const API_HOST = process.env.REACT_APP_API_HOST;

export function loadWeek(year, week) {
  let url = `${API_HOST}/api/v1/games/season/${year}/week/${week}`;
  return fetch(url)
    .then(res => res.json())
    .then(result => {
      if (!result.games) {
        throw result;
      }
      return result.games;
    });
}
