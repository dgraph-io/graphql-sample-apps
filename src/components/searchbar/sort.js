/* eslint-disable no-use-before-define */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import  {GET_LIKED_POSTS,GET_RECENT_POSTS}   from "../../gql/queryData.js";
import HOME from "../../pages/home";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function Sort() {
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
    return <HOME value={event.target.value}/>
  };

  return (
    <div style={{ width: 600 }}>
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
    </div>
  );
}