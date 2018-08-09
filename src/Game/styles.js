const team = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export default theme => ({
  game: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1em 2fr 1fr',
    gridTemplateAreas: '"time away at home pts"',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%'
  },
  time: {
    gridArea: 'time'
  },
  away: {
    gridArea: 'away',
    ...team
  },
  at: {
    gridArea: 'at'
  },
  home: {
    gridArea: 'home',
    ...team
  },
  pts: {
    gridArea: 'pts'
  },
  locked: {
    color: theme.palette.text.disabled
  }
})
