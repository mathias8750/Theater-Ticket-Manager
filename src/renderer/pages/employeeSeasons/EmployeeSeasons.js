import {Typography, Button} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 

import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ScrollableSidebar from "./components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import Season from "./components/Season";

const EmployeeSeasons = ({}) => {

  const [selectedSeason, setselectedSeason] = useState(null)

  const fetchSeasons = async () => {
    const { data: seasons } = await supabase
      //.from('Events')
     // .select('eventName, eventDateTime, eventID, Organizations(organizationName)');
      .from('Seasons')
      .select('*')


    return seasons;
  }

  const {status, data, error} = useQuery(['seasons'], fetchSeasons)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const onEventClick = (event) => {
    setselectedSeason(event)
  }

    return (
      <EmployeeHeader>
        <Typography variant="h6" align="center" style={{padding: '10px'}}>Create / Manage Seasons</Typography>
        <Box style={{ flexGrow: 1, background: 'white', height: '100%'}}>
        <Grid container style={{padding: '10px', height: '100%'}}>
          <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
            <ScrollableSidebar seasons={data} onSeasonClick={onEventClick}/>
          </Grid>


          <Grid item md={8} style={{paddingRight: '10px', height: '100%'}}>
            {selectedSeason !== null ? (
              <Season event={selectedSeason}/>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
      </EmployeeHeader>
      )
}

export default EmployeeSeasons;