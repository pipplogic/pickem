export default theme => {
  const headerColor = theme.palette.grey[200]
  return {
    header: {
      color: theme.palette.getContrastText(headerColor),
      backgroundColor: headerColor
    }
  }
}
