import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autorenew from "@material-ui/icons/Autorenew";
import Error from "@material-ui/icons/Error";
import Send from "@material-ui/icons/Send";
import cx from "classnames";
import React from "react";

export default function Login({
  classes,
  user,
  pass,
  loading,
  error,
  userChange,
  passChange,
  loginAction
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
