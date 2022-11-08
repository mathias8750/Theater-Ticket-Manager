import {Box, input, Alert, AlertTitle, Card, TextField, CardContent, Grid, Typography, Button, Snackbar, } from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from 'react';
import SnackbarAlert from 'renderer/components/SnackbarAlert';

const EmployeeEvents = ({event}) => {

  const [removedEvent, setremovedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteAlertOpen, setDeleteAlert] = useState(false);
  const [successAlertOpen, setSuccessAlert] = useState(false);
  const [failureAlertOpen, setFailureAlert] = useState(false);

  const [eventdatetime, setEventDateTime] = useState('');
  const [eventname, setEventName] = useState('');
  const [venueid, setVenueID] = useState(0);
  const [organizationid, setOrganizationID] = useState(0);

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
      .insert([{organizationID: organizationid, venueID: venueid, eventDateTime: eventdatetime, eventName: eventname}]);

      if (error) {
          toggleFailureAlert();
      } else {
          toggleSuccessAlert();
          fetchEvents();
      }
  }

const removeEvent = async(event) => {
  const {deleteEvent, error} = await supabase
      .from("Events")
      .delete()
      .eq('', event.eventName);
}

  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('*');

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
    setSelectedEvent(event)
  }

  return (
   <>
     <EmployeeHeader>
          
       <Typography>Event Management</Typography>
       <div
            style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '5px',
            }} >
          <Typography>Add A New Event</Typography>
        </div>
      <div
        style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '5px',
            height: '10%',
            }} >
              <Typography>Organization ID
                <input 
                    name = 'Organization ID'
                    type ="text"
                    onChange={event => setOrganizationID(event.target.value)}
                />
              </Typography>
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
       </div>

       <SnackbarAlert 
                alertOpen={failureAlertOpen} 
                toggleAlert={toggleFailureAlert}
                alertSeverity={'error'}
                alertText={'Event Already Exists'}
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