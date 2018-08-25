import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { setInvalidAuth } from './Login/loginDuck'
import { loadWeekGames } from './api'
import { actionsForGames } from './loadActions'

const weekOptions = [-3, -4, -5]
for (let i = 1; i <= 17; i += 1) {
  weekOptions.push(i)
}

class Selections extends Component {
  handleWeekChange (ev) {
    const { dispatch, week, picks } = this.props
    const number = ev.target.value

    dispatch({ type: 'NEW_WEEK', number })
    loadWeekGames(week.year, number)
      .then(games => {
        actionsForGames(dispatch, picks, games)
      })
      .catch(err => {
        if (err.name === 'BadAuth') {
          dispatch(setInvalidAuth(err))
        }
        dispatch({ type: 'WEEK_ERROR' })
      })
  }

  render () {
    const { week, className } = this.props

    return (
      <div className={className}>
        <FormControl>
          <Select
            value={week.number}
            onChange={ev => this.handleWeekChange(ev)}
          >
            {weekOptions.map(weekOption => (
              <MenuItem key={weekOption} value={weekOption}>
                {weekOption < 0 && 'Preseason '}
                Week {Math.abs(weekOption)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

function formatDate (date) {
  return moment(date).format('ddd, MMM DD')
}

const mapState = function (state) {
  const { picks, week } = state
  const games = Array.from(week.games.values())
  const gameTimes = games.map(game => game.gameTime)

  const firstGame = Math.min.apply(null, gameTimes)
  const lastGame = Math.max.apply(null, gameTimes)

  let msg = 'Loading...'
  if (Number.isFinite(firstGame)) {
    msg = `${formatDate(firstGame)} to ${formatDate(lastGame)}`
  }

  return { picks, week, msg, games }
}

Selections.propTypes = {
  dispatch: PropTypes.func.isRequired,
  className: PropTypes.string,
  week: PropTypes.shape({
    year: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired
  }).isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({ gameTime: PropTypes.number.isRequired })
  ).isRequired,
  picks: PropTypes.any.isRequired
}

export default connect(mapState)(Selections)
