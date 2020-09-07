import React from "react";

import { FormControl } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
PaperProps: {
    style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
    },
},
};

function getStyles(name, personName, theme) {
  return {
      fontWeight:
      personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
};
}

export default function TagSelector({names, tags, handleChange}){
    const classes = useStyles();
    const theme = useTheme();
    return (
    <FormControl className={classes.formControl}>
    <InputLabel id="demo-mutiple-chip-label" >Tags</InputLabel>
    <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={tags}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
        <div className={classes.chips}>
            {selected.map((value) => (
            <Chip key={value} label={value} className={classes.chip} />
            ))}
        </div>
        )}
        MenuProps={MenuProps}
    >
        {names.map((name) => (
        <MenuItem key={name} value={name} style={getStyles(name, tags, theme)}>
            {name}
        </MenuItem>
        ))}
    </Select>
    </FormControl>
    )
}