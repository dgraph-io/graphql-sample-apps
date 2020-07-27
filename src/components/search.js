/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export function Search({ data, label, onChange }) {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        onChange={onChange}
        id="free-solo-demo"
        freeSolo
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label={label} margin="normal" variant="outlined" />
        )}
      />
    </div>
  );
}