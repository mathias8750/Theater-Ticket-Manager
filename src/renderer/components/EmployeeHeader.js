import {AppBar, Box, Button, Grid, TextField, Toolbar} from "@mui/material";
import SidebarEventItem from "./SidebarEventItem";
import {useNavigate} from "react-router-dom";


const EmployeeHeader = ({}) => {

    let navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar>
            <Button 
                color="inherit" 
                onClick={() => navigate("/employee/home")}>
                    Employee Home
            </Button>
            <Button 
                color="inherit" 
                style={{marginLeft: 500}}>
                    Help
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default EmployeeHeader;