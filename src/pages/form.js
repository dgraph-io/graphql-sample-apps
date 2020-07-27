import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


import { Navbar, NavbarItem } from "../components/navbar";
import Content from "../components/content";
import FormField from "../components/formField"

export const Form = () => {

  return (
    <>
      <Navbar title="Home">
        <NavbarItem type="icon" iconName="search.svg" oncClick={() => {}} />
        <NavbarItem type="icon" iconName="user.svg" oncClick={() => {}} />
        <NavbarItem type="icon" iconName="settings.svg" oncClick={() => {}} />
      </Navbar>
      <Content>
        <form noValidate autoComplete="off">
				<Typography variant="overline">Form Title</Typography>
          <Grid container spacing={3} lg={8}>
						<FormField type="name" label="Name" name="name" defaultValue="" required={true} />
						<FormField type="email" label="Email" name="email" defaultValue="" required={true} />
						<FormField type="password" label="Password" name="password" defaultValue="" required={true} />
						<FormField type="number" label="Phone number" name="phone_number" defaultValue="" required={false} />
						<FormField type="date" label="DOB" name="age" defaultValue="2017-05-24" required={false} />
          </Grid>
					<Box mt={4}>
						<Button variant="contained" color="primary" size="large">
							Action
						</Button>
					</Box>
        </form>
      </Content>
    </>
  );
};

export default Form;
