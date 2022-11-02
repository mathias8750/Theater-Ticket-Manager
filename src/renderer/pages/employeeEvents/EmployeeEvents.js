import {
  Box,
  Alert,
  AlertTitle,
  Card,
  TextField,
  CardContent,
  Grid,
  Typography,
  Button,
  Snackbar,
  Dialog,
} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader";
import {useQuery} from "@tanstack/react-query";
import React, {useState, useRef, useEffect} from 'react';
import SnackbarAlert from 'renderer/components/SnackbarAlert';
import supabase from "../../utils/Supabase";

const EmployeeEvents = ({event}) => {

  const [removedEvent, setremovedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteAlertOpen, setDeleteAlert] = useState(false);
  const [successAlertOpen, setSuccessAlert] = useState(false);
  const [failureAlertOpen, setFailureAlert] = useState(false);

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
    const {data: events} = await supabase
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
    if (eventdatetimeRef.current.value.trim() != '' && eventnameRef.current.value.trim()) {
      const {data: events, error} = await supabase
        .from('Events')
        .insert([{eventDateTime: eventdatetimeRef.current.value.trim(), eventName: eventnameRef.current.value.trim()}]);

      if (error) {
        toggleFailureAlert();
      } else {
        toggleSuccessAlert();
      }
    }

    eventdatetimeRef.current.value = '';
    eventnameRef.current.value = '';
  }

  const removeEvent = async (event) => {
    const {deleteEvent, error} = await supabase
      .from("Events")
      .delete()
      .eq('', event.eventID);
  }


  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }


  return (
    <>
      <EmployeeHeader>

        <Grid container style={{height: '100%'}}>
          <Grid container direction={'column'} item md={4} style={{height: '100%'}}>
            <Grid item style={{height: '80%'}}>
              <ScrollableSidebar events={data}/>
            </Grid>

            <Grid item style={{height: '20%'}}>


              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={() => handleOpen()}
              >
                New Event
              </Button>

            </Grid>
          </Grid>

          <Grid item md={8}>
            <Typography>Manage event here</Typography>
          </Grid>
        </Grid>


        <Dialog open={open} onClose={handleClose}>
          <TextField
            id='eventdatetimeTextField'
            label='Event Date/Time'
            inputRef={eventdatetimeRef}
          />

          <TextField
            id='eventDateTimeTextField'
            label='Event Name'
            inputRef={eventnameRef}
          />

          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={addEvent}
          >
            Create Event
          </Button>
        </Dialog>


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
