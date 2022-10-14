import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";


const CustomerEvents = ({}) => {

  return (
    <div>
      <Box style={{ background: 'white', minHeight: '1000px', maxHeight: '1000px', height: '100%'}}>
        <CustomerHeader/>
        <Grid container style={{padding: '10px'}}>
          <Grid item md={4} style={{paddingRight: '10px'}}>
            <ScrollableSidebar/>
          </Grid>

          <Grid item md={8}>
            hey
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default CustomerEvents;
