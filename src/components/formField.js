import React from "react";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';


const FormField = ({ type, label, name, required, defaultValue}) => {
	return (
		<Grid item xs={12} sm={6} md={4} lg={5}>
			<TextField
				label={label}
				type={type}
				name={name}
				margin="normal"
				defaultValue={defaultValue}
				variant="outlined"
				fullWidth
				required={required}
			/>
		</Grid>
	)
}

export default FormField;