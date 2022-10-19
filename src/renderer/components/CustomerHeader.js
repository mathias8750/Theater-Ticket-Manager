import {AppBar, Box, Typography, Button, Grid, TextField, Toolbar} from "@mui/material";

import {Link as NavLink} from "react-router-dom";

const CustomerHeader = (props) => {

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar style={{ height: '10%'}}>
          <Typography varient="h1" >Theater Ticket Manager</Typography>
            <NavLink to={"/"}>
              <Button color={'inherit'}>
                Home
              </Button>
            </NavLink>
            <NavLink to={"/customer/events"}>
              <Button color={'inherit'}>
                Events
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ height: '90%'}}>
        {props.children}
      </div>
    </>
  )
}

export default CustomerHeader;
