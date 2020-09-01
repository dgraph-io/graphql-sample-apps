/* eslint-disable no-use-before-define */
import React from 'react';
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

export function Sort({cb}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    sort: '',
    name: 'hai',
  });

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
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">Sort By</InputLabel>
      <Select
        native
        value={state.age}
        onChange={handleChange}
        label="Sort By"
        inputProps={{
          name: 'sort by',
          id: 'outlined-age-native-simple',
        }}
      >
        <option aria-label="None" value="" />
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
        <option value="liked">Most Liked</option>
      </Select>
    </FormControl>
  );
}