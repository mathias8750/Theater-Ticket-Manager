import {AppBar, Box, Button, Grid, TextField, Toolbar} from "@mui/material";
import SidebarEventItem from "./SidebarEventItem";
import {Link as NavLink} from "react-router-dom";


const EmployeeHeader = (props) => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar style={{ height: '10%'}}>
            <NavLink to={"/employee/home"} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button
                color="inherit">
                  Employee Home
              </Button>
            </NavLink>
            <div style={{ flexGrow: 1}}/>
    
              <Button
                color="inherit"
                style={{alignItems: 'right'}}>
                    Help
              </Button>
      
            <NavLink to={"/"} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button
                color="inherit">
                    Logout
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

export default EmployeeHeader;
