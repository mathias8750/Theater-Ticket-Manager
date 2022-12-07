import {AppBar, Box, Button, Grid, TextField, Toolbar} from "@mui/material";
import {Link as NavLink, useNavigate, useLocation} from "react-router-dom";
import React, {useState} from 'react';
import HelpBackdrop from "./HelpBackdrop";
import {useContext} from "react";

// Header bar for login screens (employee login, org select)
const LoginHeader = (props) => {

  // Location and open setter
  const location = useLocation();
  const [open, setOpen] = useState(false);  
  const navigate = useNavigate();  

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar style={{ height: '10%'}}>
            <Button
                color="inherit"
                style={{alignItems: 'left'}}
                onClick={() => navigate("/")}>
                    Home
            </Button>
            <div style={{ flexGrow: 1}}/>
            <Button
                color={"inherit"}
                style={{alignItems: 'right'}}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                    Help
            </Button>
            <Button
                color={"inherit"}
                style={{alignItems: 'right'}}
                onClick={() => navigate("/employee/login")}
            >
                    Logout
            </Button>
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

export default LoginHeader;
