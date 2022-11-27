import React, { useState } from 'react';
import { Typography, Button, Card, CardHeader} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomerEvents from 'renderer/pages/customerEvents/CustomerEvents';
import supabase from 'renderer/utils/Supabase';
import {useQuery} from "@tanstack/react-query";
import SidebarEventCustomerList from './SidebarEventCustomerList';

const EmployeeEvent = ({event, onCustomerClick}) => {

    const navigate = useNavigate();
   
    const [eventTickets, setEventTickets] = useState([]);

    const editPrices = () => {
        navigate("/employee/home/events/ticket-price-manager", {state: event});
    }

    const fetchTickets = async () => {
      let {data: tickets, error} = await supabase
        .from('Tickets')
        .select('*, Customers(customerName, customerEmail, customerPhone)')
        .eq('eventID', event.eventID);


      let tickets_sorted = [];
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].customerID != null) {
          tickets_sorted.push(tickets[i]);
        }
      }
      let customerIDList = [];
      let customerList = [];
      for (let i = 0; i < tickets_sorted.length; i++) {
        if (!customerIDList.includes(tickets_sorted[i].customerID)) {
          customerIDList.push(tickets_sorted[i].customerID);
          customerList.push(tickets_sorted[i]);
          let index = customerList.findIndex((cust => cust.customerID === tickets_sorted[i].customerID));
          customerList[index].seats = [];
          customerList[index].seats.push({sectionNumber: tickets_sorted[i].sectionNumber, rowNumber: tickets_sorted[i].rowNumber, seatNumber: tickets_sorted[i].seatNumber});
        } else {
          let index = customerList.findIndex((cust => cust.customerID === tickets_sorted[i].customerID));
          customerList[index].seats.push({sectionNumber: tickets_sorted[i].sectionNumber, rowNumber: tickets_sorted[i].rowNumber, seatNumber: tickets_sorted[i].seatNumber});
        }
      }
      setEventTickets(customerList);
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
        <Typography>List of Customers for Event</Typography>
         <SidebarEventCustomerList tickets={eventTickets} onCustomerClick={onCustomerClick}/>
    
        </div>
        </>
    )
}

export default EmployeeEvent;