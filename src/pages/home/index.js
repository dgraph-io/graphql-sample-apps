import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Home = () => {
    return(
        <Box component="div"  m={1}>
            <Button variant="contained" color="primary" >
                Hello World
            </Button>
        </Box>
    )
}

export default Home;