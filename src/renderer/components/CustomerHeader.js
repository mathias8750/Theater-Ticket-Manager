import {AppBar, Box, Button, Grid, TextField, Toolbar} from "@mui/material";
import SidebarEventItem from "./SidebarEventItem";


const CustomerHeader = ({}) => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: 'gray', borderShadow: 'none'}}>
          <Toolbar>
            <Button color="inherit">Home</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default CustomerHeader;
