import {Box, input, Alert, AlertTitle, Card, TextField, CardContent, Grid, Typography, Button, Snackbar, } from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from 'react';
import SnackbarAlert from 'renderer/components/SnackbarAlert';
import {OrganizationContext} from "renderer/context/Context";
import {useContext} from "react";
import { generateTickets } from "./utils/TicketGenerator";
import {AddEventDialog} from "./components/AddEventDialog";

const EmployeeEvents = ({event}) => {

  const [removedEvent, setremovedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteAlertOpen, setDeleteAlert] = useState(false);
  const [successAlertOpen, setSuccessAlert] = useState(false);
  const [failureAlertOpen, setFailureAlert] = useState(false);

  const {state} = useContext(OrganizationContext);


  const [open, handleClose] = useState(false);
  const [eventdatetime, setEventDateTime] = useState('');
  const [eventname, setEventName] = useState('');
  const [venueid, setVenueID] = useState(0);

  // Toggles the success alert
  const toggleSuccessAlert = () => {
    setSuccessAlert(!successAlertOpen);
  }

  // Toggles the failure alert
  const toggleFailureAlert = () => {
    setFailureAlert(!failureAlertOpen);
  }

  // Toggles the delete alert
  const toggleDeleteAlert = () => {
    setDeleteAlert(!deleteAlertOpen);
  }

  const addEvent = async () => {
      const {data: Events, error} = await supabase
      .from('Events')
      .insert([{organizationID: state.selectedOrg.organizationID, venueID: venueid, eventDateTime: eventdatetime, eventName: eventname}]);

      if (error) {
          toggleFailureAlert();
      } else {
          toggleSuccessAlert();
          generateTickets(Events[0]);
          FetchEvents();
      }
  }

const removeEvent = async(event) => {
  const {deleteEvent, error} = await supabase
      .from("Events")
      .delete()
      .eq('', event.eventName);
}

  const FetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('*, Organizations(organizationName), Venues(venueName)');

    return events;
  }

  const {status, data, error} = useQuery(['events'], FetchEvents)
  
  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const onEventClick = (event) => {
    setSelectedEvent(event)
  }

  return (
   <>
     <EmployeeHeader>
          
      <Typography variant= "h6" align= "center" style={{padding:'10px'}}>Event Management
      <div
        style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '5px',
            height: '10%',
            }} >
              <Typography>Venue ID
                <input
                    name='Venue ID'
                    type="text"
                    onChange={event => setVenueID(event.target.value)}
                />
              </Typography>
              <Typography>Event Date/Time
                <input
                    name='Event Date/Time'
                    type="text"
                    onChange={event => setEventDateTime(event.target.value)}
                />   
              </Typography>
              <Typography>Event Name
                <input
                    name='Event Name'
                    type="text"
                    onChange={event => setEventName(event.target.value)}
                />
              </Typography>
            
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={addEvent}
                >
                    Create Event
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => {
                      handleClose(!open);
                  }}
                >
                    Make Event
                </Button>
       </div>
      </Typography>
       <SnackbarAlert 
                alertOpen={failureAlertOpen} 
                toggleAlert={toggleFailureAlert}
                alertSeverity={'error'}
                alertText={'Cannot complete action'}
                />

                <SnackbarAlert 
                alertOpen={successAlertOpen} 
                toggleAlert={toggleSuccessAlert}
                alertSeverity={'success'}
                alertText={'New Event Added Successfully'}
                />

                <SnackbarAlert 
                alertOpen={deleteAlertOpen} 
                toggleAlert={toggleDeleteAlert}
                alertSeverity={'success'}
                alertText={'Event Deleted Successfully'}
                />
      </EmployeeHeader>
    </>
  )
}

export default EmployeeEvents;