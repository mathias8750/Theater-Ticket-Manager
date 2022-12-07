import React, {useContext, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import dayjs from 'dayjs';
import {
  Dialog,
  DialogTitle,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl
} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDateTimePicker} from '@mui/x-date-pickers/DesktopDateTimePicker';
import {generateTickets} from "../utils/TicketGenerator";
import supabase from "../../../utils/Supabase";
import {OrganizationContext} from "../../../context/Context";
import SnackbarAlert from "../../../components/SnackbarAlert";
// List of imported libraries and components above

// Function displays the dialog box for an event creation when prompted by the user upon pressing the 
// "create event" button in EmployeeEvents
const AddEventDialog = ({open, onClose, fetchEvents}) => {

  // States used throughout the program, as well as their respective updater functions
  const eventNameRef = useRef('');
  const [eventDateTime, setEventDateTime] = useState(dayjs('2023-01-01T00:00:00.000Z'));
  const [eventVenueID, setEventVenueID] = useState(1);
  const [eventSeasonID, setEventSeasonID] = useState(0);
  const [seasonList, setSeasonList] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [venueAlertOpen, setVenueAlertOpen] = useState(false);
  const [seasonAlertOpen, setSeasonAlertOpen] = useState(false);
  const [invalidFieldAlertOpen, setInvalidFieldAlertOpen] = useState(false);
  const eventTimeCheckRef = useRef(false);
  
  // Brings in the organization selected by the user and its information from supabase
  const {state} = useContext(OrganizationContext);

  // Console logs the event to confirm the event has been created
  const onEventCreate = () => {
    console.log('VenueID: ' + eventVenueID);
    console.log('SeasonID: ' + eventSeasonID);
  }

// Checks the user input date/time for a newly created event to make sure 
// the date/time does not come into conflict with other events/season date limits
  const checkEventTimes = async (newDateTime) => {

    eventTimeCheckRef.current = false;

    const {data: events, error} = await supabase
      .from('Events')
      .select('eventDateTime')
      .eq('venueID', eventVenueID);

// If new event input by the user has the same values as another event, return true
    if (!error) {  
      for (let i = 0; i < events.length; i++) {
        let dateTime = new Date(events[i].eventDateTime);
        if ((newDateTime.getDate() === dateTime.getDate()) && (newDateTime.getMonth() === dateTime.getMonth()) && (newDateTime.getFullYear() === dateTime.getFullYear())) {
          eventTimeCheckRef.current = true;
        }
      }
    }
  }

  // Inserts an event by taking the user input values from the prompts and updates supabase Events with the 
  // newly created event
  const insertEvent = async () => {

    const dt = new Date(eventDateTime);
    let season = null;
    if (eventSeasonID != 0) {
      season = eventSeasonID;
    }
    const {data: Events, error} = await supabase
      .from('Events')
      .insert([{
        seasonID: season,
        organizationID: state.selectedOrg.organizationID,
        venueID: eventVenueID,
        eventDateTime: dt.toString(),
        eventName: eventNameRef.current.value.trim()
      }]);

      // Outputs messages according to status of process
    if (error) {
      toggleErrorAlert();
    } else {
      toggleSuccessAlert();
      generateTickets(Events[0]);
      fetchEvents();
    }
  }

  // Takes the user input from the event creation box and checks data/time with each event in the season before
  // inserting the event into the database
  const addEvent = () => {
    let dateCheck = false;
    let newEventDateTime = new Date(eventDateTime);
    if ((eventNameRef.current.value.trim() != '') && (newEventDateTime.toString() != 'Invalid Date') && (newEventDateTime.toString() != 'Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)')) {
    for (let i = 0; i < seasonList.length; i++) {
      if (seasonList[i].seasonID === eventSeasonID) {
        let startDate = new Date(seasonList[i].startDate);
        let endDate = new Date(seasonList[i].endDate);
        if ((startDate <= newEventDateTime) && (newEventDateTime <= endDate)) {
          dateCheck = true;
        }
      }
    }
    if (eventSeasonID === 0) {
      dateCheck = true;
    }
    if (dateCheck) {
      checkEventTimes(newEventDateTime).then(() => {
        if (!eventTimeCheckRef.current) {
          insertEvent();
        } else {
          toggleVenueAlert();
        }
      })
    } else {
      toggleSeasonAlert();
    }
   } else {
    toggleInvalidFieldAlert();
   }
  }

  // Call supabase to retrieve data from the seasons table 
  const fetchSeasons = async () => {
    const {data: seasons, error} = await supabase
      .from('Seasons')
      .select('*')
      .eq('organizationID', state.selectedOrg.organizationID);

    if (!error) {
      setSeasonList(seasons);
    }

    return seasons;
  }

 // Query for the seasons table in Supabase, along with variable for storage and error 
  const {status, data, error} = useQuery(['seasons'], fetchSeasons)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // Toggle functions for each alert message in the page
  const toggleSuccessAlert = () => {
    setSuccessAlertOpen(!successAlertOpen);
  }

  const toggleErrorAlert = () => {
    setErrorAlertOpen(!errorAlertOpen);
  }

  const toggleVenueAlert = () => {
    setVenueAlertOpen(!venueAlertOpen);
  }

  const toggleSeasonAlert = () => {
    setSeasonAlertOpen(!seasonAlertOpen);
  }

  const toggleInvalidFieldAlert = () => {
    setInvalidFieldAlertOpen(!invalidFieldAlertOpen);
  }


  // Contains the output to the screen, including the dialog box itself, and the prompts for the event information
  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{
        justifyContent: 'center',
      }}
    >
      <DialogTitle style={{paddingLeft: '25%'}}>Create New Event</DialogTitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '2%',
          paddingBottom: '4%',
        }}>
        <TextField
          id='newEventNameTextField'
          label='Event Name'
          inputRef={eventNameRef}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '18%',
          paddingBottom: '4%',
          width: '64%',
        }}>
        <FormControl fullWidth>
          <InputLabel id="venue-select-label">Venue</InputLabel>
          <Select
            fullWidth
            labelId="venue-select-label"
            id="venue-select"
            value={eventVenueID}
            label="Venue"
            onChange={(event) => {
              setEventVenueID(event.target.value)
            }}
          >
            <MenuItem value={1}>Concert Hall</MenuItem>
            <MenuItem value={2}>Playhouse</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '18%',
          paddingBottom: '4%',
          width: '64%',
        }}>
        <FormControl fullWidth>
          <InputLabel id="season-select-label">Season</InputLabel>
          <Select
            fullWidth
            labelId="season-select-label"
            id="season-select"
            value={eventSeasonID}
            label="Season"
            onChange={(event) => {
              setEventSeasonID(event.target.value)
            }}
          >
            <MenuItem value={0}>No Season</MenuItem>
            {data.map((season) => {
              return (
                <MenuItem key={season.seasonID} value={season.seasonID}>
                  {season.seasonName}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '17%',
          paddingBottom: '4%',
          width: '66%',
        }}>
        <Typography>Date & Time
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              value={eventDateTime}
              onChange={(newValue) => {
                setEventDateTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '2%',
          paddingLeft: '2%',
          paddingBottom: '4%',
        }}>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          size='small'
          onClick={addEvent}
        >
          Add Event
        </Button>
      </div>
      <SnackbarAlert
        alertOpen={successAlertOpen}
        toggleAlert={toggleSuccessAlert}
        alertSeverity={'success'}
        alertText={'New Event Added Successfully'}
      />
      <SnackbarAlert
        alertOpen={errorAlertOpen}
        toggleAlert={toggleErrorAlert}
        alertSeverity={'error'}
        alertText={'Error Adding Event'}
      />
      <SnackbarAlert
        alertOpen={venueAlertOpen}
        toggleAlert={toggleVenueAlert}
        alertSeverity={'error'}
        alertText={'Venue occupied on specified date'}
      />
      <SnackbarAlert
        alertOpen={seasonAlertOpen}
        toggleAlert={toggleSeasonAlert}
        alertSeverity={'error'}
        alertText={'Event date is not within selected season'}
      />
      <SnackbarAlert
        alertOpen={invalidFieldAlertOpen}
        toggleAlert={toggleInvalidFieldAlert}
        alertSeverity={'error'}
        alertText={'Invalid Field(s)'}
      />
    </Dialog>
  );
}

// Export AddEventDialog function to output to screen
export default AddEventDialog;
