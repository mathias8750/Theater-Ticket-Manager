import {AppBar, Box, Button, Grid, TextField, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {Link as NavLink} from "react-router-dom";

const LoginHeader = (props) => {

  const navigate = useNavigate();  

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar style={{ height: '10%'}}>
            <Button
                color="inherit"
                onClick={() => navigate("/")}>
                    Customer Home
            </Button>
            <div style={{ flexGrow: 1}}/>
            <Button
                color={"inherit"}
                style={{alignItems: 'right'}}
            >
                    Help
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

export default LoginHeader;