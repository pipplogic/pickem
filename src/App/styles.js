const mdContainer = theme => ({
  width: '100vw',
  maxWidth: theme.breakpoints.values.md,
  margin: '0 auto'
})

const flexColumn = {
  display: 'flex',
  flexDirection: 'column'
}

const expand = {
  flexGrow: '1'
}

const center = {
  display: 'flex',
  justifyContent: 'center'
}

export default theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    ...flexColumn
  },
  body: {
    ...mdContainer(theme),
    ...expand,
    ...flexColumn,
    paddingBottom: '20px'
  },
  selections: {
    ...center
  },
  week: {
    ...expand
  }
})
