import React, {useState} from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';
import {Dialog, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const AddEventDialog = ({ open, handleClose }) => {

  const [eventName, setEventName] = useState('')
  const [eventVenue, setEventVenue] = useState(0)
  const [eventDate, setEventDate] = useState(dayjs('2023-01-01T00:00:00.000Z'))

  const handleVenueChange = (event) => {
    setEventVenue(event.target.value)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Stack spacing={3} style={{ padding: '10px'}}>
        <TextField
          key={'eventNameField'}
          label={"Event Name"}
          value={eventName}
          onChange={(event) => {
            setEventName(event.target.value)
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="venue-select-label">Venue</InputLabel>
          <Select
            labelId="venue-select-label"
            id="venue-select"
            value={eventVenue}
            label="Venue"
            onChange={handleVenueChange}
          >
            <MenuItem value={0}>Civic Center</MenuItem>
            <MenuItem value={1}>Playhouse</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="venue-select-label">Season</InputLabel>
          <Select
            labelId="venue-select-label"
            id="venue-select"
            value={eventVenue}
            label="Season"
            onChange={handleVenueChange}
          >
            <MenuItem value={0}>No Season</MenuItem>
            <MenuItem value={1}>Season 1</MenuItem>
          </Select>
        </FormControl>

        
      </Stack>
    </Dialog>
  )
}

export default AddEventDialog;
