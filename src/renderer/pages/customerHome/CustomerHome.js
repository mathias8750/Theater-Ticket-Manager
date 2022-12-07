import {Box, Button, Grid, Typography} from "@mui/material";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {compareDateTime} from "renderer/utils/DateTime";

import SidebarEventItem from "../../components/SidebarEventItem";
import {compareDateTime} from "../../utils/DateTime";
import {useNavigate} from "react-router-dom";


const CustomerHome = ({}) => {

  // Number of upcoming events to display
  const numEvents = 4;

  const currentDateTime = new Date();
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
    return upcomingEvents.slice(0, numEvents);
  }

  const fetchEvents = async () => {
    let { data: events } = await supabase
      .from('Events')
      // gets all the info from the events table, combining them with org and venues
      .select('*, Organizations(organizationName), Venues(venueName)');


    // filters out the events before todays date
    events = events.filter((event) => {
      const today = new Date()
      const eventDate = new Date(event.eventDateTime)

      if (today < eventDate) {
        return event
      }
    })

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
    navigate("/customer/events", {state: event});
  }

  return (
    <CustomerHeader helpID={0}>

      <Box style={{flexGrow: 1, background: 'white', height: '100%'}}>

        <Typography variant="h6" align="center" style={{padding: '10px'}}>Upcoming Events</Typography>

        <div style={{ margin: 'auto', width: '80%'}}>
          <Grid container direction={'column'} style={{height: '100%'}}>

            <Grid item style={{
              border: '1px solid rgba(0, 0, 0, 0.05)',
              height: '90%',
            }}>
              <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
                <div style={{ height: '100%', overflow: 'auto'}}>
                  {getUpcomingEvents(data).map((event) => (
                    <SidebarEventItem event={event} onEventClick={onEventClick}/>
                  ))}
                </div>
              </div>

            </Grid>
          </Grid>
        </div>

        <div style={{
          margin: 'auto',
          width: '25%',
          padding: '10px',
        }}>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            size='small'
            fullWidth
            onClick={() => {
              navigate('/customer/events')
            }}
          >
            See all events
          </Button>
        </div>



      </Box>
    </CustomerHeader>

  )
}

export default CustomerHome;
