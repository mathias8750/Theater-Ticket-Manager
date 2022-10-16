import {AppBar, Box, Button, Grid, TextField, Toolbar} from "@mui/material";
import SidebarEventItem from "./SidebarEventItem";
import {useNavigate} from "react-router-dom";


const EmployeeHeader = (props) => {

    let navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar style={{ height: '10%'}}>
            <Button
                color="inherit"
                onClick={() => navigate("/employee/home")}>
                    Employee Home
            </Button>
            <div style={{ flexGrow: 1}}/>

            <Button
                color="inherit"
                style={{alignItems: 'right'}}
            >
                    Help
            </Button>
            <Button
                color="inherit"
                onClick={() => navigate("/")}>
                    Logout
            </Button>
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