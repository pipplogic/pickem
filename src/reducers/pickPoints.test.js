/* eslint-env jest  */
import { getScoreOptions, updatePickPoints } from './pickPoints'
import { addError } from './status'
import { getPickId, updateScore, switchScores } from './picksDuck'

const now = new Date().getTime()
const past = now - 1e7
const future = now + 1e7

const poolId = 'pool1'

const state = {
  pools: {
    scoringOptions: {
      [poolId]: [1, 2, 3, 10],
      pool2: [1, 1, 1, 1, 5, 6, 7]
    }
  },
  week: {
    games: {
      oldGame: {
        gameTime: past,
        weekId: 'thisWeek',
        gameId: 'oldGame'
      },
      oldGame2: {
        gameTime: past,
        weekId: 'thisWeek',
        gameId: 'oldGame2'
      },
      game1: {
        gameTime: future,
        weekId: 'thisWeek',
        gameId: 'game1'
      },
      game2: {
        gameTime: future,
        weekId: 'thisWeek',
        gameId: 'game2'
      },
      futureGame: {
        gameTime: future,
        weekId: 'nextWeek',
        gameId: 'futureGame'
      }
    },
    weeks: {
      thisWeek: ['oldGame', 'oldGame2', 'game1', 'game2'],
      nextWeek: ['futureGame']
    }
  },
  picksDuck: {
    byId: {
      [getPickId({ poolId, gameId: 'oldGame' })]: {
        score: 10
      },
      [getPickId({ poolId, gameId: 'game1' })]: {
        score: 1
      },
      [getPickId({ poolId, gameId: 'game2' })]: {
        score: 2
      },
      [getPickId({ poolId, gameId: 'futureGame' })]: {
        score: 5
      },
      [getPickId({ poolId: 'pool2', gameId: 'oldGame' })]: {
        score: 1
      },
      [getPickId({ poolId: 'pool2', gameId: 'oldGame2' })]: {
        score: 6
      }
    }
  }
}
const getState = () => state

describe('pointOptions', () => {
  it('should exclude the frozen score and nothing else', () => {
    const options = getScoreOptions(state)(poolId)('thisWeek')
    const expectedOptions = [1, 2, 3]

    expect(options).toEqual(expectedOptions)
  })

  it('should only remove one copy', () => {
    const options = getScoreOptions(state)('pool2')('thisWeek')
    const expectedOptions = [1, 1, 1, 5, 7]

    expect(options).toEqual(expectedOptions)
  })
})

describe('updatePickPoints', () => {
  let dispatch = jest.fn()

  beforeEach(() => {
    dispatch = jest.fn()
  })

  it('should not change points for game in the past', () => {
    updatePickPoints({
      gameId: 'oldGame',
      poolId,
      score: 42
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)

    const action = dispatch.mock.calls[0][0]

    const expectedAction = addError('Game has already started')

    expect(action).toEqual(expectedAction)
  })

  it('should allow changing to unpicked score', () => {
    const score = 42
    const gameId = 'game1'
    updatePickPoints({
      gameId,
      poolId,
      score
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)

    const action = dispatch.mock.calls[0][0]

    const expectedAction = updateScore({ poolId, gameId: 'game1', score: 42 })

    expect(action).toEqual(expectedAction)
  })

  it('should allow changing to a score picked a different week', () => {
    const gameId = 'game1'
    const score = 5
    updatePickPoints({
      gameId,
      poolId,
      score
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)

    const action = dispatch.mock.calls[0][0]

    const expectedAction = updateScore({ poolId, gameId, score })

    expect(action).toEqual(expectedAction)
  })

  it('should allow changing to a score from a frozen game', () => {
    const gameId = 'game1'
    const score = 10
    updatePickPoints({
      gameId,
      poolId,
      score
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)

    const action = dispatch.mock.calls[0][0]

    const expectedAction = updateScore({ poolId, gameId, score })

    expect(action).toEqual(expectedAction)
  })

  it('should be able to flip 2 picks', () => {
    const gameId = 'game1'
    const score = 2
    updatePickPoints({
      gameId,
      poolId,
      score
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledTimes(1)

    const action = dispatch.mock.calls[0][0]

    const expectedAction = switchScores({
      poolId,
      gameId1: 'game1',
      gameId2: 'game2'
    })

    expect(action).toEqual(expectedAction)
  })
})
