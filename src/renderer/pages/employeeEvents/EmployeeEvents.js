import {Box, Alert, AlertTitle, Card, TextField, CardContent, Grid, Typography, Button, Snackbar, } from "@mui/material";
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
  const organizationidRef = useRef('');
  const eventidRef = useRef('');
  const venueidRef = useRef('');
  const seasonidRef = useRef('');
  const eventdatetimeRef = useRef('');
  const eventnameRef = useRef('');

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

  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('*, Organizations(organizationName), Venues(venueName)');

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

  const addEvent = async () => {
    if(eventidRef.current.value.trim() != '' && organizationidRef.current.value.trim() != '' && venueidRef.current.value.trim() != '' && eventdatetimeRef.current.value.trim() != '' && eventnameRef.current.value.trim() != '' && seasonidRef.current.value.trim() != '') {
        const {data: Events, error} = await supabase
        .from('Events')
        .insert([{ eventID: eventidRef.current.value.trim(), organizationID: organizationidRef.current.value.trim(), venueID: venueidRef.current.value.trim(), seasonID: seasonidRef.current.value.trim(), eventDateTime: eventdatetimeRef.current.value.trim(), eventName: eventnameRef.current.value.trim()}]);

        if (error) {
            toggleFailureAlert();
        } else {
            toggleSuccessAlert();
        }
    }
    eventidRef.current.value = '';
    organizationidRef.current.value = '';
    venueidRef.current.value = '';
    seasonidRef.current.value = '';
    eventdatetimeRef.current.value = '';
    eventnameRef.current.value = '';
  }

  const removeEvent = async(event) => {
    const {deleteEvent, error} = await supabase
        .from("Events")
        .delete()
        .eq('', event.eventID);
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
                <TextField
                    id='venueidTextField'
                    label='Venue ID'
                    inputRef={venueidRef}
                />

                <TextField
                    id='eventnameTextField'
                    label='Event Name'
                    inputRef={eventnameRef}
                />

                <TextField
                    id='eventidTextField'
                    label='Event ID'
                    inputRef={eventidRef}
                />

                <TextField
                    id='eventDateTimeTextField'
                    label='Event Date/Time'
                    inputRef={eventdatetimeRef}
                />   

                <TextField
                    id='organizationidTextField'
                    label='Organization ID'
                    inputRef={organizationidRef}
                />

                <TextField
                    id='seasonidTextField'
                    label='Season ID'
                    inputRef={seasonidRef}
                />   
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