export default theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  icon: {
    height: `${theme.spacing.unit * 6}px`,
    width: `${theme.spacing.unit * 6}px`
  },
  spin: {
    animation: 'spin 2s linear infinite'
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }
})
