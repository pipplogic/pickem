export const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

export function getCurrentScores (gameIds, picks) {
  return gameIds
    .map(gameId => picks.get(gameId))
    .filter(pick => pick && pick.locked)
    .map(pick => pick.score)
    .filter(score => score > 0)
}

export function getAvailableScores (gameIds, picks) {
  return getCurrentScores(gameIds, picks).reduce(
    (remainingOptions, currentScore) => {
      if (!remainingOptions.find(score => score === currentScore)) {
        return remainingOptions
      }

      return remainingOptions.filter(score => score !== currentScore)
    },
    options
  )
}
