import React, { useState } from 'react';
import { Typography, Button, Card, CardHeader} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomerEvents from 'renderer/pages/customerEvents/CustomerEvents';
import supabase from 'renderer/utils/Supabase';
import {useQuery} from "@tanstack/react-query";

const EmployeeEvent = ({event}) => {

    const navigate = useNavigate();

    const [eventTickets, setEventTickets] = useState([]);

    const editPrices = () => {
        navigate("/employee/home/events/ticket-price-manager", {state: event});
    }

    const fetchTickets = async () => {
      let {data: tickets, error} = await supabase
        .from('Tickets')
        .select('*')
        .eq('eventID', event.eventID)
  
        setEventTickets(tickets);
        return tickets;
    }

    const {status, data, error} = useQuery(['tickets'], fetchTickets)

    if (status === 'loading') {
      return <span>Loading...</span>
    }

    if (status === 'error') {
      return <span>Error: {error.message}</span>
    }

    return (
        <>
        <Typography>{event.eventName}</Typography>
        <div
        style={{
          display: 'flex',
          margin: 'auto',
        }}>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          size='small'
          onClick={editPrices}
        >
          Edit Ticket Prices
        </Button>
    <Typography>List of Customers for Event
       {eventTickets.map((ticket) => {
            if (ticket.eventID === event.eventID) {
              <Card>
                <CardHeader
                  title={ticket.customerID}
                  subtitle={ticket.customerID}
                />
              </Card>
            }
        })}
    </Typography>
    
        </div>
        </>
    )
}

export default EmployeeEvent;