import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autorenew from "@material-ui/icons/Autorenew";
import Error from "@material-ui/icons/Error";
import Send from "@material-ui/icons/Send";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

export default function Login({
  classes,
  error,
  loading,
  loginAction,
  pass,
  passChange,
  user,
  userChange
}) {
  return (
    <form
      className={classes.root}
      noValidate
      onSubmit={loginAction(user, pass)}
    >
      <Typography variant="subheading" align="center">
        Login
      </Typography>
      <TextField
        label="Email"
        value={user}
        onChange={userChange}
        error={error}
      />
      <TextField
        label="Password"
        type="password"
        value={pass}
        onChange={passChange}
        error={error}
      />
      <Button type="submit" variant="raised" color="primary">
        Login
        {loading && (
          <Autorenew className={cx(classes.rightIcon, classes.load)} />
        )}
        {error && <Error className={classes.rightIcon} color="error" />}
        {!loading && !error && <Send className={classes.rightIcon} />}
      </Button>
    </form>
  );
}

Login.propTypes = {
  classes: PropTypes.shape({
    load: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired
  }).isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginAction: PropTypes.func.isRequired,
  pass: PropTypes.string.isRequired,
  passChange: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  userChange: PropTypes.func.isRequired
};
