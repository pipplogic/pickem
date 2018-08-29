import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

// TODO Put these somewhere...
let weekOptionNumbers = [-3, -4]
for (let i = 1; i <= 17; i += 1) {
  weekOptionNumbers.push(i)
}

const valueToText = week =>
  `${week < 0 ? 'Preseason' : ''}  Week ${Math.abs(week)}`.trim()

const weekOptions = weekOptionNumbers.map(week => ({
  label: valueToText(week),
  value: week
}))

class Selections extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen (ev) {
    this.setState({ open: true })
  }
  handleClose (ev) {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state
    const { className, currentWeek } = this.props
    return (
      <div className={className}>
        <Button
          buttonRef={node => {
            this.anchorEl = node
          }}
          onClick={this.handleOpen}
          aria-owns={open ? 'menu' : null}
          aria-haspopup='true'
        >
          {valueToText(currentWeek)}
          <ArrowDropDown />
        </Button>

        <Menu
          id='menu'
          anchorEl={this.anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          {weekOptions.map(weekOption => (
            <MenuItem
              key={weekOption.value}
              component={Link}
              onClick={this.handleClose}
              to={`/week/${weekOption.value}`}
            >
              {weekOption.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

Selections.propTypes = {
  className: PropTypes.string,
  currentWeek: PropTypes.string
}

export default Selections
