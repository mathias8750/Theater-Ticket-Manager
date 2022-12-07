import {
  Box,
  Select,
  input,
  Alert,
  AlertTitle,
  Card,
  TextField,
  CardContent,
  Grid,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import ScrollableSidebar from "./components/ScrollableSidebar";
import EmployeeHeader from "../../components/EmployeeHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import React, {useState} from 'react';
import {useContext} from "react";
import {generateTickets} from "./utils/TicketGenerator";
import dayjs from 'dayjs';
import AddEventDialog from "./components/AddEventDialog";
import {OrganizationContext} from "../../context/Context";
import SnackbarAlert from "../../components/SnackbarAlert";
import EmployeeEvent from "./components/EmployeeEvent";
// List of imported libraries and components above

const EmployeeEvents = ({}) => {

  // List of objects used throughout the page, fitted with updater functions 
  const [removedEvent, setremovedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteAlertOpen, setDeleteAlert] = useState(false);
  const [successAlertOpen, setSuccessAlert] = useState(false);
  const [failureAlertOpen, setFailureAlert] = useState(false);
  const [successUpdateAlertOpen, setUpdateSuccessAlert] = useState(false);
  const [failureUpdateAlertOpen, setUpdateFailureAlert] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [open, setOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [eventname, setEventName] = useState('');
  const [venueid, setVenueID] = useState(0);
  const [seasonID, setSeasonID] = useState(0);
  const [eventdatetime, setDateTime] = useState(dayjs('2023-01-01T00:00:00.000Z'));

  // Sends in the selected organization to render details from organization onto this page
  const {state} = useContext(OrganizationContext);
  

  // Map customer list to the screen
  const toggleMapCustomers = () => {
    setMapCustomers(!mapCustomers);
  }

  // Toggles the success alert
  const toggleSuccessAlert = () => {
    setSuccessAlert(!successAlertOpen);
  }

  // Toggles the failure alert
  const toggleFailureAlert = () => {
    setFailureAlert(!failureAlertOpen);
  }

  // Toggles the success alert
  const toggleUpdateSuccessAlert = () => {
    setUpdateSuccessAlert(!successUpdateAlertOpen);
  }

  // Toggles the failure alert
  const toggleUpdateFailureAlert = () => {
    setUpdateFailureAlert(!failureUpdateAlertOpen);
  }

  // Toggles the delete alert
  const toggleDeleteAlert = () => {
    setDeleteAlert(!deleteAlertOpen);
  }

  // 
  const handleClose = () => {
    setOpen(false);
  }

  // Sends an event object created by the user to the database updates the eventList variable
  const addEvent = async () => {
    const dt = new Date(eventdatetime); 
    let season = null;
    if (seasonID != 0) { // Sets the season for the event
      season = seasonID;
    }
    const {data: Events, error} = await supabase // Gathers the data from the Events table in supabase
      .from('Events')
      .insert([{           // Places the user created event into the database, while using
        seasonID: season,  // the organization context to fill in the organization attribute
        organizationID: state.selectedOrg.organizationID,
        venueID: venueid,
        eventDateTime: dt.toString(),
        eventName: eventname
      }]);

      // Output whether the operation completed or not
    if (error) {
      toggleFailureAlert();
    } else {
      toggleSuccessAlert();
      generateTickets(Events[0]);
      FetchEvents();
    }
  }

  // Calls the events table in supabase and updates the specified event to the info provided by the user
  const updateEvent = async (oldEvent) => {
    const {data: Events, error} = await supabase
      .from('Events')
      .update([{
        seasonID: season,
        organizationID: state.selectedOrg.organizationID,
        venueID: venueid,
        eventDateTime: dt.toString(),
        eventName: eventname
      }])

      // Output whether the operation succeeded or not
    if (error) {
      toggleUpdateFailureAlert();
    } else {
      toggleUpdateSuccessAlert();
      generateTickets(Events[0]);
      FetchEvents();
    }
  }

  // Remove the specified event from the supabase events table
  const removeEvent = async (event) => {
    const {deleteEvent, error} = await supabase
      .from("Events")
      .delete()
      .eq('', event.eventName);
  }

  // Updates the eventList object by gathering data from the supabase events table
  const FetchEvents = async () => {
    const {data: events, error} = await supabase
      .from('Events')
      .select('*, Organizations(organizationName), Venues(venueName)');
    if (!error) {
      setEventList(events);
    }
    return events;
  }

  // Query the supabase for the events table, and will output if an error occurred in the process
  const {status, data, error} = useQuery(['events'], FetchEvents)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // Updates the selectedEvent variable when the user clicks on any event in the list
  const onEventClick = (event) => {
    setSelectedEvent(event);
  }

  // Outputs the AddEvent dialog which will allow the user to input the info for the new event
  const toggleAddEventDialog = () => {
    setAddEventOpen(!addEventOpen);
  }

  return (
    // The entire output to the screen, consisting of the employeeheader; the addevent, list of events, and search bar
    // buttons; Also contains alert messages for each operation in the page 
    
    // Sends functions to the event list sidebar component, as well as the employeeEvent component
    <>
      <EmployeeHeader helpID={5}>
        <div style={{flexGrow: 1, background: 'white', height: '100%'}}>
          <Grid container style={{padding: '10px', height: '100%'}}>
            <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
              <ScrollableSidebar events={eventList} onEventClick={onEventClick} onAddClick={toggleAddEventDialog}/>
            </Grid>
            <Grid item md={8} style={{paddingRight: '10px', height: '75%', display: 'flex'}}>
              {selectedEvent !== null ? (
                <EmployeeEvent key={selectedEvent.eventID} event={selectedEvent}/>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </div>
        <AddEventDialog open={addEventOpen} onClose={toggleAddEventDialog} fetchEvents={FetchEvents}/>
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

// Export EmployeeEvents function to output to screen
export default EmployeeEvents;

