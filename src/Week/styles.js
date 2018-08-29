export default theme => {
  const headerColor = theme.palette.grey[200]
  return {
    header: {
      color: theme.palette.getContrastText(headerColor),
      backgroundColor: headerColor
    },
    actions: {
      display: 'flex',
      justifyContent: 'center'
    },
    load: {
      animation: 'spin 2s linear infinite'
    },
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' }
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    }
  }
}
