import {Typography, Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ScrollableSidebar from "./components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useContext, useState, useRef} from "react";
import Season from "./components/Season";
import SnackbarAlert from "renderer/components/SnackbarAlert";
import CreateSeasonDialog from "./components/CreateSeasonDialog";
import { OrganizationContext } from "renderer/context/Context";
import dayjs from 'dayjs';

const EmployeeSeasons = ({}) => {

  const [seasonList, setSeasonList] = useState([]);
  const [selectedSeason, setselectedSeason] = useState(null)
  const [seasonAddOpen, setSeasonAddOpen] = useState(false);
  const [dateErrorOpen, setDateErrorOpen] = useState(false);
  const [nameErrorOpen, setNameErrorOpen] = useState(false);
  const [seasonAddSuccessOpen, setSeasonAddSuccessOpen] = useState(false);
  const [seasonAddErrorOpen, setSeasonAddErrorOpen] = useState(false);
  const [seasonStartDate, setSeasonStartDate] = useState(dayjs(new Date()));
  const [seasonEndDate, setSeasonEndDate] = useState(dayjs(new Date()));
  const {state} = useContext(OrganizationContext)
  const newSeasonNameRef = useRef('');

  const fetchSeasons = async () => {
    const { data: seasons } = await supabase
      .from('Seasons')
      .select('*')
      .eq('organizationID', state.selectedOrg.organizationID)

    setSeasonList(seasons);
    return seasons;
  }

  const insertSeason = async () => {
    const startDate = new Date(seasonStartDate);
    const endDate = new Date(seasonEndDate);

    const {data: season, error} = await supabase
      .from('Seasons')
      .insert({organizationID: state.selectedOrg.organizationID, seasonName: newSeasonNameRef.current.value.trim(), startDate: startDate.toString(), endDate: endDate.toString()});
    
    if (error) {
      toggleSeasonAddError();
    } else {
      toggleSeasonAddSuccess();
      fetchSeasons();
    }
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
    toggleAddSeasonDialog();
  }

  const onSeasonCreate = () => {
    let valid = true;
    let startDate = new Date(seasonStartDate);
    let endDate = new Date(seasonEndDate);
    for (const season of seasonList) {
      let tempStartDate = new Date(season.startDate);
      let tempEndDate = new Date(season.endDate);

      if ((tempStartDate >= startDate) && (tempStartDate <= endDate)) {
        valid = false;
      }
      if ((tempEndDate >= startDate) && (tempEndDate <= endDate)) {
        valid = false;
      }
    }
    if (valid) {
      if (newSeasonNameRef.current.value.trim() === '') {
        toggleNameError();
      } else {
        insertSeason();
      }
    } else {
      toggleDateError();
    }
  }

  const toggleAddSeasonDialog = () => {
    setSeasonAddOpen(!seasonAddOpen);
  }

  const toggleDateError = () => {
    setDateErrorOpen(!dateErrorOpen);
  }

  const toggleNameError = () => {
    setNameErrorOpen(!nameErrorOpen);
  }

  const toggleSeasonAddSuccess = () => {
    setSeasonAddSuccessOpen(!seasonAddSuccessOpen);
  }

  const toggleSeasonAddError = () => {
    setSeasonAddErrorOpen(!seasonAddErrorOpen);
  }

    return (
      <EmployeeHeader>
        <Box style={{ flexGrow: 1, background: 'white', height: '100%'}}>
          <Grid container style={{padding: '10px', height: '100%'}}>
            <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
              <ScrollableSidebar seasons={seasonList} onSeasonClick={onSeasonClick} onCreateClick={onCreateClick}/>
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
        <CreateSeasonDialog 
          open={seasonAddOpen} 
          onClose={toggleAddSeasonDialog} 
          seasonNameRef={newSeasonNameRef} 
          startDate={seasonStartDate} 
          endDate={seasonEndDate}
          setSeasonStartDate={setSeasonStartDate}
          setSeasonEndDate={setSeasonEndDate} 
          onSeasonCreate={onSeasonCreate} 
        />
        <SnackbarAlert 
          alertOpen={dateErrorOpen} 
          toggleAlert={toggleDateError}
          alertSeverity={'error'}
          alertText={'Season overlaps existing season'}
        />
        <SnackbarAlert 
          alertOpen={nameErrorOpen} 
          toggleAlert={toggleNameError}
          alertSeverity={'error'}
          alertText={'Season must have a name'}
        />
        <SnackbarAlert 
          alertOpen={seasonAddSuccessOpen} 
          toggleAlert={toggleSeasonAddSuccess}
          alertSeverity={'success'}
          alertText={'Season added successfully'}
        />
        <SnackbarAlert 
          alertOpen={seasonAddErrorOpen} 
          toggleAlert={toggleSeasonAddError}
          alertSeverity={'error'}
          alertText={'Error adding season'}
        />
      </EmployeeHeader>
      )
}

export default EmployeeSeasons;