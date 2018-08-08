import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autorenew from "@material-ui/icons/Autorenew";
import Error from "@material-ui/icons/Error";
import Send from "@material-ui/icons/Send";
import cx from "classnames";
import React from "react";

export default function Register({
  classes,
  first,
  last,
  email,
  error,
  submitting,
  success,
  handleInputChange,
  handleSubmit
}) {
  if (success) {
    return (
      <div className={classes.root}>
        <Typography variant="heading">Check your email!</Typography>
      </div>
    );
  }
  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
      <Typography variant="subheading" align="center">
        Register
      </Typography>
      <TextField
        label="First Name"
        name="first"
        value={first}
        error={Boolean(error)}
        onChange={handleInputChange}
      />
      <TextField
        label="Last Name"
        name="last"
        value={last}
        error={Boolean(error)}
        onChange={handleInputChange}
      />
      <TextField
        type="email"
        label="Email"
        name="email"
        value={email}
        error={Boolean(error)}
        onChange={handleInputChange}
      />

      <Button type="submit" variant="raised" color="primary">
        Register
        {submitting && (
          <Autorenew className={cx(classes.rightIcon, classes.load)} />
        )}
        {error && <Error className={classes.rightIcon} color="error" />}
        {!submitting && !error && <Send className={classes.rightIcon} />}
      </Button>
    </form>
  );
}
