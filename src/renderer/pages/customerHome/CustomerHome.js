import {Button, Typography, Box, Grid} from "@mui/material";
import {Link as NavLink, useNavigate} from 'react-router-dom';
import CustomerHeader from "../../components/CustomerHeader";
import TextField from '@mui/material/TextField';
import ScrollableSidebar from "../../components/ScrollableSidebar";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import React, {useState, useContext} from "react";
import CustomerEvent from "../customerEvents/components/CustomerEvent";
import { EventContext } from "renderer/context/Context";
import { compareDateTime } from "renderer/utils/DateTime";



import "./style.css";
import { autoUpdater } from "electron";



const CustomerHome = ({}) => {

  // Number of upcoming events to display
  const numEvents = 4;

  const currentDateTime = new Date();
  const {state, update} = useContext(EventContext);
  const navigate = useNavigate();

  // Returns array of the closest upcoming events
  const getUpcomingEvents = (events) => {
    let upcomingEvents = [];
    for (let i = 0; i < events.length; i++) {
      let eventDateTime = new Date(events[i].eventDateTime);
      if (eventDateTime > currentDateTime) {
        upcomingEvents = [events[i], ...upcomingEvents];
      }
    }
    upcomingEvents.sort(compareDateTime);
    const closestUpcomingEvents = upcomingEvents.slice(0, numEvents);
    return closestUpcomingEvents;
  }

  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('*, Organizations(organizationName), Venues(venueName)');

    update({selectedEvent: null});

    return events;
  }

  const {status, data, error} = useQuery(['events'], fetchEvents)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const onEventClick = (event) => {
    update({selectedEvent: event});
    navigate("/customer/events");
  }

  return (
    <CustomerHeader>
      <Typography variant="h6" align="center" style={{padding: '10px'}}>Upcoming Events</Typography>
      
      <Box style={{ flexGrow: 1, background: 'white', height: '90%'}}>
        <Grid  style={{padding: '10px', margin: 'auto', width: '80%'}}>
          <Grid item md={4} style={{paddingRight: '0px', height: '100%'}}>
            <ScrollableSidebar events={getUpcomingEvents(data)} onEventClick={onEventClick}/>
          </Grid>
        </Grid>
      </Box>

      <Box style={{margin: 'auto', width: '20%'}}>
        <NavLink to={"/customer/events"}>
          <Button>
            See All Events
          </Button>
        </NavLink>
      </Box>
      
    </CustomerHeader>
    
  )
}

export default CustomerHome;
