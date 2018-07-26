import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";

export default function Login({
  classes,
  user,
  pass,
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
      <TextField label="Email" value={user} onChange={userChange} />
      <TextField
        label="Password"
        type="password"
        value={pass}
        onChange={passChange}
      />
      <Button type="submit" variant="raised" color="primary">
        Login
      </Button>
    </form>
  );
}
