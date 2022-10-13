import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";


const CustomerEvents = ({}) => {

  return (
    <CustomerHeader>
      <Box style={{ flexGrow: 1, background: 'white', height: '100%'}}>
        <Grid container style={{padding: '10px', height: '100%'}}>
          <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
            <ScrollableSidebar/>
          </Grid>

          <Grid item md={8} style={{paddingRight: '10px', height: '100%'}}>
            hey
          </Grid>
        </Grid>
      </Box>
    </CustomerHeader>
  )
}

export default CustomerEvents;
