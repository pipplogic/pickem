const expand = {
  flexGrow: "1"
};

export default theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    ...expand
  }
});
