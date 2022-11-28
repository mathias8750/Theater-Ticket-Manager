import SidebarEventItem from "./SidebarEventItem";
import {AppBar, Box, Typography, Button, Grid, TextField, Toolbar} from "@mui/material";
import {Link as NavLink, useLocation} from "react-router-dom";
import { useState, } from "react";
import HelpBackdrop from "./HelpBackdrop";

const CustomerHeader = (props) => {

  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar style={{ height: '10%'}}>
            <NavLink to={"/"} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button color={'inherit'}>
                Home
              </Button>
            </NavLink>
            <NavLink to={"/customer/events"} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button color={'inherit'}>
                Events
              </Button>
            </NavLink>
            <div style={{ flexGrow: 1}}/>
            <NavLink to={"/employee/login"} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button className="button" color = {'inherit'}>
                Employee Login
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
