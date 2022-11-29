import SidebarEventItem from "./SidebarEventItem";
import {AppBar, Box, Typography, Button, Grid, TextField, Toolbar} from "@mui/material";
import {Link as NavLink, useLocation} from "react-router-dom";
import { useState, } from "react";
import HelpBackdrop from "./HelpBackdrop";
import {UserContext} from "renderer/context/Context";
import {useContext} from "react";
import { OrganizationContext } from "renderer/context/Context";




const CustomerHeader = (props) => {

  console.log("help  " + props.helpID);

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const {state} = useContext(UserContext);
  const {orgState} = useContext(OrganizationContext);

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
            <Button
                color="inherit"
                style={{alignItems: 'right'}}
                onClick={() => {
                    setOpen(!open);
                }}>
                    Help
              </Button>
            <NavLink to={"/employee/login"} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button className="button" color = {'inherit'}>
                Employee Login
              </Button>
            </NavLink>
            <HelpBackdrop open={open} setOpen={setOpen} helpID={props.helpID}/>
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
