import {AppBar, Box, Button, Grid, TextField, Toolbar, Typography} from "@mui/material";
import SidebarEventItem from "./SidebarEventItem";
import {Link as NavLink, useLocation} from "react-router-dom";
import { useState, } from "react";
import HelpBackdrop from "./HelpBackdrop";
import {UserContext} from "renderer/context/Context";
import {useContext} from "react";
import { OrganizationContext } from "renderer/context/Context";
// List of imported libraries and components above


const EmployeeHeader = (props) => {

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const {state} = useContext(UserContext);
  const {orgState} = useContext(OrganizationContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar style={{ height: '10%'}}>
            <NavLink to={"/employee/home"} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button
                color="inherit">
                  Homepage
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
              <Button  
                color="inherit">
                    Logout 
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

export default EmployeeHeader;
