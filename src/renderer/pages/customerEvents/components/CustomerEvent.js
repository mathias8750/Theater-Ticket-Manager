import {
  Card,
  CardHeader,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid, Stack
} from "@mui/material";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import SeatList from "./SeatList";
import {recommendSeats} from "../utils/SeatRecommender";
import {eventDateTimeSubheader} from "../../../utils/DateTime";
import supabase from "../../../utils/Supabase";

const CustomerEvent = ({event, onRecommendedSeatsClick}) => {

  const [eventTickets, setEventTickets] = useState([]);
  const [numTickets, setNumTickets] = useState(2);
  const [recommendedSeats, setRecommendedSeats] = useState([]);
  const [eventLocation, setEventLocation] = useState(event.venueID);
  const date = new Date(event.eventDateTime);

  let navigate = useNavigate();

  const onTicketSelectButton = () => {
    navigate("/customer/events/seat-viewer", {state: event})
  }

  const fetchTickets = async () => {
    let {data: tickets, error} = await supabase
      .from('Tickets')
      .select('*')
      .eq('eventID', event.eventID)

    setEventTickets(tickets);
    setEventLocation(event.venueID);
    setRecommendedSeats(recommendSeats(tickets, numTickets, eventLocation));
    return tickets;
  }

  useEffect(() => {
    fetchTickets();
  }, [event]);

  const {status, data, error} = useQuery(['tickets'], fetchTickets)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }


  const handleTicketNumChange = (event) => {
    setNumTickets(event.target.value);
    setRecommendedSeats(recommendSeats(eventTickets, event.target.value, eventLocation));
  }

  return (
    <>
      <div style={{height: '100%', width: '100%'}}>

        <Card>
          <CardHeader
            title={event.eventName}
            subheader={eventDateTimeSubheader(event)}
          />
        </Card>

        <div style={{
          alignItems: 'center',
          paddingTop: '2%',
          width: '100%',
        }}>
          <FormControl fullWidth>
            <InputLabel id="ticket-select-label">Number of Tickets</InputLabel>
            <Select
              labelId="ticket-select-label"
              id="ticket-select"
              value={numTickets}
              label="Number of Tickets"
              onChange={handleTicketNumChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{
          paddingTop: '1%',
          width: '100%',
          overflow: 'auto',
          height: '85%'
        }}>
          <Box style={{flexGrow: 0, background: 'white', height: '100%', display: 'flex'}}>
            <SeatList recommendedSeats={recommendedSeats} onRecommendedSeatsClick={onRecommendedSeatsClick}/>
          </Box>

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
            onClick={onTicketSelectButton}
          >
            Select Tickets From Chart
          </Button>
        </div>


      </div>
    </>
  )
}

export default CustomerEvent;
