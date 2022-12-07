// Import libraries
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
import {OrganizationContext} from "renderer/context/Context";
import {compareDateTime} from "renderer/utils/DateTime";

import dayjs from 'dayjs';
import {compareDateTimeSeason} from "../../utils/DateTime";

// Employe Seasons
const EmployeeSeasons = ({}) => {

  // Define constants
  const [seasonList, setSeasonList] = useState([]);
  const [selectedSeason, setselectedSeason] = useState(null)
  const [seasonAddOpen, setSeasonAddOpen] = useState(false);
  const [dateErrorOpen, setDateErrorOpen] = useState(false);
  const [nameErrorOpen, setNameErrorOpen] = useState(false);
  const [dateFormatErrorOpen, setDateFormatErrorOpen] = useState(false);
  const [flippedDatesErrorOpen, setFlippedDatesErrorOpen] = useState(false);
  const [seasonAddSuccessOpen, setSeasonAddSuccessOpen] = useState(false);
  const [seasonAddErrorOpen, setSeasonAddErrorOpen] = useState(false);
  const [seasonStartDate, setSeasonStartDate] = useState(dayjs(new Date()));
  const [seasonEndDate, setSeasonEndDate] = useState(dayjs(new Date()));
  const {state} = useContext(OrganizationContext)
  const newSeasonNameRef = useRef('');

  // Sorts array of seasons by date
  const sortSeasons = (seasons) => {
    // Check if season's length is 0
    if (seasons.length == 0) {
      console.log("No seasons");
      return seasons;
    }
    // Array for sorted seasons
    let sortedSeasons = [];
    let ignore = [];
    let smallestSeason;
    let smallestIndex;
    // Sort the seasons
    for (let i = 0; i < seasons.length; i++) {
      let smallestDate = new Date(2050, 11, 24, 10, 33, 30, 0);
      for (let j = 0; j < seasons.length; j++) {
        if (ignore.includes(j) == false) {
          let d = new Date(seasons[j].startDate);
          if (d < smallestDate) {
            smallestDate = d;
            smallestSeason = seasons[j];
            smallestIndex = j;
          }
        }
      }
      ignore.push(smallestIndex)
      sortedSeasons.push(smallestSeason);
    }

    return sortedSeasons;
  }

  /*
  // Sort seasons by date
  // Adapted from CustomerHome.js
  const currentDateTime = new Date();
  const sortSeasonsBackup = (seasons) => {
    //sortedSeasons = seasons;
    let sortedSeasons = [];

    for (let i = 0; i < seasons.length; i++) {
      let seasonDate = new Date(seasons[i].startDate);
      if (seasonDate > currentDateTime) {
        sortedSeasons = [seasons[i], ...sortedSeasons];
      }
    }
    sortedSeasons.sort(compareDateTime);
    return sortedSeasons;
  }
  */

  // Get seasons from supabase
  const fetchSeasons = async () => {
    let {data: seasons} = await supabase
      .from('Seasons')
      .select('*')
      .eq('organizationID', state.selectedOrg.organizationID)

    /*seasons = seasons.filter((season) => {
      const today = new Date()
      const endDate = new Date(season.endDate)

      if (today < endDate) {
        return season
      }
    })*/

    let sorted_seasons = seasons.sort(compareDateTimeSeason);
    setSeasonList(sorted_seasons);
    return seasons;
  }

  // Add new season to supabae
  const insertSeason = async () => {
    const startDate = new Date(seasonStartDate);
    const endDate = new Date(seasonEndDate);

    const {data: season, error} = await supabase
      .from('Seasons')
      .insert({
        organizationID: state.selectedOrg.organizationID,
        seasonName: newSeasonNameRef.current.value.trim(),
        startDate: startDate.toString(),
        endDate: endDate.toString()
      });

    // Check for error on season add
    if (error) {
      toggleSeasonAddError();
    } else {
      toggleSeasonAddSuccess();
      fetchSeasons();
    }
  }

  // Get seasons and return information
  const {status, data, error} = useQuery(['seasons'], fetchSeasons)

  // Loading message
  if (status === 'loading') {
    return <span>Loading...</span>
  }

  // Error message
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // Selects season 
  const onSeasonClick = (season) => {
    setselectedSeason(season)
  }

  // Open season creation menu
  const onCreateClick = () => {
    toggleAddSeasonDialog();
  }

  // Season creation
  const onSeasonCreate = () => {
    let valid = true;
    let startDate = new Date(seasonStartDate);
    let endDate = new Date(seasonEndDate);
    for (let i = 0; i < seasonList.length; i++) {
      let tempStartDate = new Date(seasonList[i].startDate);
      let tempEndDate = new Date(seasonList[i].endDate);

      // Check for valid dates
      if ((startDate >= tempStartDate) && (startDate <= tempEndDate)) {
        valid = false;
      }
      if ((endDate >= tempStartDate) && (endDate <= tempEndDate)) {
        valid = false;
      }
      if ((tempStartDate >= startDate) && (tempStartDate <= endDate)) {
        valid = false;
      }
      if ((tempEndDate >= startDate) && (tempEndDate <= endDate)) {
        valid = false;
      }
    }

    // If valid dates
    if (valid) {
      if (newSeasonNameRef.current.value.trim() === '') {
        toggleNameError();
      } else if ((startDate.toString() === 'Invalid Date') || (endDate.toString() === 'Invalid Date') || (startDate.toString() === 'Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)') || (endDate.toString() === 'Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)')) {
        toggleDateFormatError();
      } else if (startDate >= endDate) {
        toggleFlippedDatesError();
      } else {
        insertSeason();
      }
    } else {
      toggleDateError();
    }
  }

  // Toggles add season menu
  const toggleAddSeasonDialog = () => {
    setSeasonAddOpen(!seasonAddOpen);
  }

  // Toggles date error message
  const toggleDateError = () => {
    setDateErrorOpen(!dateErrorOpen);
  }

  // Toggles name error message
  const toggleNameError = () => {
    setNameErrorOpen(!nameErrorOpen);
  }

  // Toggles season success message
  const toggleSeasonAddSuccess = () => {
    setSeasonAddSuccessOpen(!seasonAddSuccessOpen);
  }

  // Toggles season add error message
  const toggleSeasonAddError = () => {
    setSeasonAddErrorOpen(!seasonAddErrorOpen);
  }

  // Toggles date error message
  const toggleFlippedDatesError = () => {
    setFlippedDatesErrorOpen(!flippedDatesErrorOpen);
  }

  // Toggles date format error message
  const toggleDateFormatError = () => {
    setDateFormatErrorOpen(!dateFormatErrorOpen);
  }

  // Page contents
  return (
    <>
      <EmployeeHeader helpID={6}>
        <Box style={{flexGrow: 1, background: 'white', height: '100%'}}>
          <Grid container style={{padding: '10px', height: '100%'}}>
            <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
              <ScrollableSidebar seasons={seasonList} onSeasonClick={onSeasonClick} onCreateClick={onCreateClick}/>
            </Grid>
            <Grid item md={8} style={{paddingRight: '10px', height: '83%', display: 'flex'}}>
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
        <SnackbarAlert
          alertOpen={flippedDatesErrorOpen}
          toggleAlert={toggleFlippedDatesError}
          alertSeverity={'error'}
          alertText={'Start date must be before end date'}
        />
        <SnackbarAlert
          alertOpen={dateFormatErrorOpen}
          toggleAlert={toggleDateFormatError}
          alertSeverity={'error'}
          alertText={'Invalid date'}
        />
      </EmployeeHeader>
    </>

  )
}

export default EmployeeSeasons;
