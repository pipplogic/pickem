import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import StatusPage from '../StatusPage'
import Game from '../Game'
import GameHeader from '../GameHeader'
import { idType, requireStrings } from '../propType'

class Week extends Component {
  componentDidMount () {
    this.loadWeek()
  }

  componentDidUpdate ({ weekNumber: prevWeekNumber }) {
    const { weekNumber } = this.props
    if (weekNumber !== prevWeekNumber) {
      this.loadWeek()
    }
  }

  loadWeek () {
    const { weekNumber, loadWeek } = this.props
    loadWeek(weekNumber)
  }

  render () {
    const { classes, className, error, loading, gameIds } = this.props

    if (loading) {
      return <StatusPage className={className} status='loading' />
    }

    if (error) {
      return <StatusPage className={className} status='error' />
    }

    return (
      <List className={className}>
        <ListSubheader classes={{ root: classes.header }}>
          <GameHeader />
        </ListSubheader>
        {gameIds &&
          gameIds.map(gameId => (
            <React.Fragment key={gameId}>
              <ListItem>
                <Game gameId={gameId} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
    )
  }
}

Week.propTypes = {
  weekNumber: idType.isRequired,
  className: PropTypes.string,
  classes: requireStrings('header'),
  error: PropTypes.any,
  loading: PropTypes.bool,
  loadWeek: PropTypes.func.isRequired,
  gameIds: PropTypes.arrayOf(idType.isRequired).isRequired
}

export default Week
