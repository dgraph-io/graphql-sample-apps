/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function Selector({label, cb, options}) {
  const classes = useStyles();
  const [state, setState] = useState({
    name: 'hai',
  });

  //Sort by default by Newest
  useEffect(()=> {
    cb(options[0]["value"])
  },[] )

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    const by = event.target.value;
    cb(by)
  };

  return (
    <FormControl className={classes.formControl} >
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        native
        defaultValue={{label: options[2]["name"],value: options[2]["value"]}}
        onChange={handleChange}
        label={label}
        inputProps={{
          name: label,
          id: 'outlined-age-native-simple',
        }}
      >
      
        {options.map((option) => (
          <option value={option["value"]}> {option["name"]}</option>
        ))}
      </Select>
    </FormControl>
  );
}