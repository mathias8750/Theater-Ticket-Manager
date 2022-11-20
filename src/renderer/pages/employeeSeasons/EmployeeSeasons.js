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
import { compareDateTime } from "renderer/utils/DateTime";


const EmployeeSeasons = ({}) => {

  const [selectedSeason, setselectedSeason] = useState(null)
  const {state} = useContext(OrganizationContext)

const sortSeasons = (seasons) => {
	if (seasons.length == 0){
		console.log("No seasons");
		return seasons;
	}
	let sortedSeasons = [];
	let ignore = [];
	// make smallest the index
	//let smallestDate = new Date(seasons[0].startDate);
	let smallestSeason;
	let smallestIndex;
	for (let i = 0; i < seasons.length; i++){
		//let smallestDate = new Date(seasons[i].startDate);
		//let smallestSeason = seasons[i];
		//let smallestIndex = i;
		let smallestDate = new Date(2050, 11, 24, 10, 33, 30, 0);
		console.log(i);
		for (let j = 0; j < seasons.length; j++){
			if (ignore.includes(j) == false){
				d = new Date(seasons[j].startDate);
				if (d < smallestDate){
					smallestDate = d;
					smallestSeason = seasons[j];
					smallestIndex = j;
				}
			}
		}
		ignore.push(smallestIndex)
		sortedSeasons.push(smallestSeason);
	}
	console.log(ignore)
  
  return sortedSeasons;
}

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

  const fetchSeasons = async () => {
    const { data: seasons } = await supabase
      //.from('Events')
     // .select('eventName, eventDateTime, eventID, Organizations(organizationName)');
      .from('Seasons')
      .select('*')
      .eq('organizationID', state.selectedOrg.organizationID)
/*  Attempt at sorting seasons by date
    seasons = seasons.sort(function(a, b){
      return new Date(b.startDate) - new Date(a.startDate);
    });
*/
    return seasons;
  }



  const {status, data, error} = useQuery(['seasons'], fetchSeasons)

  /*
  data.sort(function(d1, d2){
    return d1.date - d2.date;
  });
  */
 //data.sort((a, b) => a.startDate - b.startDate);
 console.log(data)
 


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
            <ScrollableSidebar seasons={sortSeasons(data)} onSeasonClick={onEventClick}/>
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