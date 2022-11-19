import {Typography, Button} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 

import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ScrollableSidebar from "./components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useContext, useState} from "react";
import Season from "./components/Season";
import { OrganizationContext } from "renderer/context/Context";

const EmployeeSeasons = ({}) => {

  const [selectedSeason, setselectedSeason] = useState(null)
  const {state} = useContext(OrganizationContext)

  const fetchSeasons = async () => {
    const { data: seasons } = await supabase
      .from('Seasons')
      .select('*')
      .eq('organizationID', state.selectedOrg.organizationID)


    return seasons;
  }

  const {status, data, error} = useQuery(['seasons'], fetchSeasons)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const onSeasonClick = (season) => {
    setselectedSeason(season)
  }

  const onCreateClick = () => {
    console.log('create season');
  }

    return (
      <EmployeeHeader>
        <Box style={{ flexGrow: 1, background: 'white', height: '100%'}}>
        <Grid container style={{padding: '10px', height: '100%'}}>
          <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
            <ScrollableSidebar seasons={data} onSeasonClick={onSeasonClick} onCreateClick={onCreateClick}/>
          </Grid>


          <Grid item md={8} style={{paddingRight: '10px', height: '100%'}}>
            {selectedSeason !== null ? (
              <Season season={selectedSeason}/>
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