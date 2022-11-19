import {Box, input, Alert, AlertTitle, Card, TextField, CardContent, Grid, Typography, Button, Snackbar, } from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from 'react';
import SnackbarAlert from 'renderer/components/SnackbarAlert';
import {OrganizationContext} from "renderer/context/Context";
import {useContext} from "react";
import { generateTickets } from "./utils/TicketGenerator";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';


const EmployeeEvents = ({event}) => {

  const [removedEvent, setremovedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteAlertOpen, setDeleteAlert] = useState(false);
  const [successAlertOpen, setSuccessAlert] = useState(false);
  const [failureAlertOpen, setFailureAlert] = useState(false);

  const {state} = useContext(OrganizationContext);
  const [open, setOpen] = useState(false);
  const [eventname, setEventName] = useState('');
  const [venueid, setVenueID] = useState(0);
  const [eventdatetime, setDateTime] = useState(dayjs('2023-01-01T00:00:00.000Z'));

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

  const handleClose = () => {
    setOpen(false);
  }

  const addEvent = async () => {
      const dt = new Date(eventdatetime);

      const {data: Events, error} = await supabase
      .from('Events')
      .insert([{organizationID: state.selectedOrg.organizationID, venueID: venueid, eventDateTime: dt.toString(), eventName: eventname}]);

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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDateTimePicker
                    value={eventdatetime}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setDateTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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