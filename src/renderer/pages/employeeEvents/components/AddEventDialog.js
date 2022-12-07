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
  const {state} = useContext(OrganizationContext);

  const onEventCreate = () => {
    console.log('VenueID: ' + eventVenueID);
    console.log('SeasonID: ' + eventSeasonID);
  }

  const checkEventTimes = async (newDateTime) => {

    eventTimeCheckRef.current = false;

    const {data: events, error} = await supabase
      .from('Events')
      .select('eventDateTime')
      .eq('venueID', eventVenueID);

    if (!error) {
      for (let i = 0; i < events.length; i++) {
        let dateTime = new Date(events[i].eventDateTime);
        if ((newDateTime.getDate() === dateTime.getDate()) && (newDateTime.getMonth() === dateTime.getMonth()) && (newDateTime.getFullYear() === dateTime.getFullYear())) {
          eventTimeCheckRef.current = true;
        }
      }
    }
  }

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

    if (error) {
      toggleErrorAlert();
    } else {
      toggleSuccessAlert();
      generateTickets(Events[0]);
      fetchEvents();
    }
  }

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

  const {status, data, error} = useQuery(['seasons'], fetchSeasons)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

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

export default AddEventDialog;
