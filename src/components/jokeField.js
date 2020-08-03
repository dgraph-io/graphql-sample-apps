import React from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const JokeField = ({ type, label, name, required, rows, defaultValue }) => {
  return (
      <TextField
        label={label}
        type={type}
        name={name}
        margin="normal"
        defaultValue={defaultValue}
        variant="outlined"
        fullWidth
        multiline
        rows={rows}
        required={required}
      />
  );
};

export default JokeField;
